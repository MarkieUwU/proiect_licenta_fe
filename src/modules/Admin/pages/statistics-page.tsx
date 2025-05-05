import { useQuery } from "@tanstack/react-query";
import AmountsSection from "../components/amounts-section";
import { getGenderRatio, getTopUsersByConnection, getTopUsersByPosts } from "@/modules/Profile/apis/user.api";
import { getTopPostsByLikes } from "@/modules/Posts/apis/post.api";
import { ChartData } from "chart.js";
import TopBarChart from "../components/top-bar-chart";
import { ChartColor } from "../models/chart-color.enum";
import PieChartSection from "../components/pie-chart-section";
import { useTranslation } from "react-i18next";

const StatisticsPage: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Pages.Statistics' });

  const topUsersByConnections = useQuery({
    queryKey: ['topUsersByConnections'],
    queryFn: () => getTopUsersByConnection()
  });

  const topUsersByPosts = useQuery({
    queryKey: ['topUsersByPosts'],
    queryFn: () => getTopUsersByPosts()
  });

  const topPostsByLikes = useQuery({
    queryKey: ['topPostsByLikes'],
    queryFn: () => getTopPostsByLikes()
  });

  const genderRatio = useQuery({
    queryKey: ['genderRatio'],
    queryFn: () => getGenderRatio()
  })

  const topUsersByPostsData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: t('Posts'),
        data: [],
        backgroundColor: ChartColor.blue
      }
    ],
  };

  topUsersByPosts.data?.forEach((value) => {
    topUsersByPostsData.labels?.push(value.fullName);
    topUsersByPostsData.datasets[0].data.push(value.posts.length);
  });

  const topPostsByLikesData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: t('Likes'),
        data: [],
        backgroundColor: ChartColor.red,
      },
    ],
  };

  topPostsByLikes.data?.forEach((value) => {
    topPostsByLikesData.labels?.push(`${value.user.fullName}: ${value.title}`);
    topPostsByLikesData.datasets[0].data.push(value.likes.length);
  });

  const topUsersByConnectionsData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: t('Connections'),
        data: [],
        backgroundColor: ChartColor.yellow,
      },
    ],
  };

  topUsersByConnections.data?.forEach((value: any) => {
    topUsersByConnectionsData.labels?.push(value.user);
    topUsersByConnectionsData.datasets[0].data.push(value.connections)
  });

  const genderRatioData: ChartData<'pie'> = {
    labels: [t('Male'), t('Female')],
    datasets: [
      {
        label: t('NrOfUsers'),
        data: [],
        backgroundColor: [ChartColor.blue, ChartColor.red, ChartColor.grey],
      },
    ],
  };

  let undeclared = 0;

  genderRatio.data?.forEach((value: number) => {
    undeclared += value;
    genderRatioData.datasets[0].data.push(value);
  });

  if (undeclared < 100) {
    genderRatioData.labels?.push('undeclared');
    genderRatioData.datasets[0].data.push(100 - undeclared);
  }

  return (
    <div className='flex flex-col gap-5 pt-6 pb-3 mx-auto h-full overflow-y-auto'>
      <AmountsSection />
      <TopBarChart
        title={t('UsersByConnectionsTitle')}
        data={topUsersByConnectionsData}
        loading={topUsersByConnections.isPending}
      />
      <TopBarChart
        title={t('UsersByPostsTitle')}
        data={topUsersByPostsData}
        loading={topUsersByPosts.isPending}
      />
      <PieChartSection
        title={t('UsersGenderTitle')}
        data={genderRatioData}
        loading={genderRatio.isPending}
      />
      <TopBarChart
        title={t('PostsByLikes')}
        data={topPostsByLikesData}
        loading={topPostsByLikes.isPending}
      />
    </div>
  );
}

export default StatisticsPage;
