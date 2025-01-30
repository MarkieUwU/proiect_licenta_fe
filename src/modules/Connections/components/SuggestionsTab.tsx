import { getSuggestions } from "@/modules/Profile/apis/user.api";
import { LoggedUserStateContext } from "@/modules/Profile/hooks/logged-user-state-context";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React, { useContext } from "react";
import { SuggestionCard } from "./SuggestionCard";
import { Input } from "@/components/ui/input";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import NoRecordsFound from "@/components/ui/NoRecordsFound";

const schema = yup.object({
  search: yup.string(),
});

const SuggestionsTab: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.ConnectionsPage.SuggestionsTab' })
  const {
    register,
    watch
  } = useForm({
    resolver: yupResolver(schema)
  });
  const searchString = watch('search');
  const { loggedUser } = useContext(LoggedUserStateContext);
  let debounceTimer: Timer;

  const suggestionsResponse = useQuery({
    queryKey: ['suggestions'],
    queryFn: () => getSuggestions({ id: loggedUser.id, searchString }),
  });

  const handleSearching = () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      suggestionsResponse.refetch();
    }, 300);
  };

  if (!suggestionsResponse.data) {
    return <NoRecordsFound title={t('NoRecords.Title')} text={t('NoRecords.Text')} />;
  }

  const suggestions = suggestionsResponse.data.map((suggestion) => {
    return (
      <SuggestionCard key={suggestion.id} user={suggestion}></SuggestionCard>
    )
  });

  return (
    <div className='flex flex-col'>
      <Input
        {...register('search')}
        placeholder={t('SearchPlaceholder')}
        className='max-w-[500px] mx-auto mt-5 mb-5 rounded-lg'
        onInput={handleSearching}
      />
      {suggestionsResponse.isPending ? (
        <LoaderCircle className='animate-spin' />
      ) : (
        <div className='w-screen lg:max-w-[1270px]'>
          {!suggestionsResponse.data.length ? (
            <NoRecordsFound title={t('NoRecords.Title')} />
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-fit'>
              {suggestions}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SuggestionsTab;
