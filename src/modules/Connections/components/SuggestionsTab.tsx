import NoRecordsFound from "@/core/components/NoRecordsFound";
import { getSuggestions } from "@/modules/Profile/apis/user.api";
import { LoggedUserContext } from "@/shared/hooks/userContext";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React, { useContext } from "react";
import { SuggestionCard } from "./SuggestionCard";

export const SuggestionsTab: React.FC = () => {
  const loggedUser = useContext(LoggedUserContext);

  const suggestionsResponse = useQuery({
    queryKey: ['suggestions'],
    queryFn: () => getSuggestions(loggedUser.id),
  });

  if (suggestionsResponse.isPending) {
    return <LoaderCircle className='animate-spin' />;
  }

  if (!suggestionsResponse.data?.length) {
    return <NoRecordsFound title='No suggestions found' text='There are no suggestions available for the moment' />;
  }

  const suggestions = suggestionsResponse.data.map((suggestion) => {
    return (
      <SuggestionCard user={suggestion}></SuggestionCard>
    )
  });

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-fit'>
      {suggestions}
    </div>
  );
}