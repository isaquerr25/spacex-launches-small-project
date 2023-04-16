import { useQuery, gql } from '@apollo/client';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'tailwindcss/tailwind.css';
import FadeUp from './fadeUp';
import PopTop from './popTop';
import { AiFillAppstore } from 'react-icons/ai';
import { AiOutlineMenu } from 'react-icons/ai';

const LAUNCHPADS_QUERY = gql`
  query LaunchesPast(
    $find: LaunchFind
    $limit: Int
    $offset: Int
    $order: String
    $sort: String
  ) {
    launchesPast(
      find: $find
      limit: $limit
      offset: $offset
      order: $order
      sort: $sort
    ) {
      details
      id
      is_tentative
      launch_date_local
      launch_date_unix
      launch_date_utc
      launch_site {
        site_id
        site_name
        site_name_long
      }
      launch_success
      links {
        article_link
        flickr_images
        mission_patch
        mission_patch_small
        presskit
        reddit_campaign
        reddit_launch
        reddit_media
        reddit_recovery
        video_link
        wikipedia
      }
      rocket {
        fairings {
          recovered
          recovery_attempt
          reused
          ship
        }

        rocket_name
        rocket_type
      }
    }
  }
`;

export const ListRockets = () => {
  const [useOrg, setOrg] = useState(true);
  const [useIndex, setIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [launches, setLaunches] = useState<any>([]);

  const { loading, error, fetchMore } = useQuery(LAUNCHPADS_QUERY, {
    variables: { limit: 10, offset: 0 },
    onCompleted: (data) => {
      setLaunches(data.launchesPast);
    },
  });

  const loadMore = () => {
    const newOffset = launches.length;
    fetchMore({
      variables: { limit: 10, offset: newOffset },
      updateQuery: (data) => {
        if (data.launchesPast.length === 0) {
          setHasMore(false);
        } else {
          setLaunches([...launches, ...data.launchesPast]);
        }
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="flex flex-col items-center pb-10 gap-[1rem]">
      <ButtonGroup size="md" isAttached variant="outline">
        <IconButton
          onClick={() => {
            setOrg(true);
          }}
          className={`${useOrg && '!bg-[teal]'}`}
          aria-label="Add to friends"
          icon={<AiFillAppstore />}
        />
        <IconButton
          className={`${!useOrg && '!bg-[teal]'}`}
          onClick={() => {
            setOrg(false);
          }}
          aria-label="Add to friends"
          icon={<AiOutlineMenu />}
        />
      </ButtonGroup>
      <InfiniteScroll
        dataLength={launches.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        className="w-full max-[100vw]"
      >
        <Flex
          className={`${
            !useOrg
              ? 'flex-col pt-[2rem] px-[2rem]'
              : ' flex flex-wrap items-center justify-center pt-[2rem] px-[2rem] '
          } gap-[0.5rem]`}
          overflowX="hidden"
        >
          {launches.map((launch: any, index: number) => (
            <PopTop key={launch.id} launch={launch}>
              <FadeUp>
                <Flex
                  className={`gap-[1rem] cursor-pointer zoom border-[#36d7b7] border-[2px] rounded-md
                  ${
                    !useOrg
                      ? ' flex-col sm:flex-row'
                      : ' flex-col flex-wrap items-start justify-center w-[20rem]'
                  }
                  `}
                  p={4}
                  borderBottomWidth="1px"
                >
                  <div className="flex gap-[1rem]">
                    <img
                      src={
                        launch.rocket.rocket_name == 'Falcon 9'
                          ? './rocket-right-svgrepo-com (1).svg'
                          : './rocket-launch-svgrepo-com.svg'
                      }
                      alt=""
                      className="w-[2rem] m-[0rem]"
                    />
                    <Flex className="flex-col items-start ">
                      <h3>Name: {launch.rocket.rocket_name}</h3>
                      <h3>
                        Rocket Type:
                        <span
                          className={`${
                            !launch?.rocket.rocket_type && 'text-[red]'
                          }`}
                        >
                          {launch?.rocket.rocket_type ?? '--NO DATA--'}
                        </span>
                      </h3>
                    </Flex>
                  </div>
                  <Flex className="flex-col items-start">
                    <h3>
                      Rocket Reused:
                      <span
                        className={`${!launch.rocket.reused && 'text-[red]'}`}
                      >
                        {launch.rocket.reused ?? '--NO DATA--'}
                      </span>
                    </h3>
                    <h3>
                      Launch Status:
                      <span
                        className={`${!launch.launch_success && 'text-[red]'}`}
                      >
                        {launch.launch_success ?? '--NO DATA--'}
                      </span>
                    </h3>
                  </Flex>

                  <Flex className="flex-col items-start">
                    <Text mb={2} fontSize="sm">
                      Date/Time: {launch.launch_date_local.replace('T', ' ')}
                    </Text>
                    <Text
                      className="!text-[#6bf16b] !font-bold"
                      mb={2}
                      fontSize="sm"
                      color="gray.500"
                    >
                      Click to Details
                    </Text>
                  </Flex>
                </Flex>
              </FadeUp>
            </PopTop>
          ))}
        </Flex>
      </InfiniteScroll>
    </div>
  );
};
