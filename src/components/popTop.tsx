import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import React, { useState, useEffect, FormEvent, ReactNode } from 'react';
import YouTube from 'react-youtube';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import FadeUp from './fadeUp';
import { FaBeer } from 'react-icons/fa';
import { MdOutlineArticle } from 'react-icons/md';
import { BsWikipedia } from 'react-icons/bs';
import { RiMistFill } from 'react-icons/ri';
import { GiSubmarineMissile } from 'react-icons/gi';
import { FaCompressAlt } from 'react-icons/fa';
import { AiFillRedditCircle } from 'react-icons/ai';
import useWindowDimensions from '../tools/getWindowDimensions';
interface PopTopProps {
  launch: any;
  children: ReactNode;
}

const PopTop: React.FC<PopTopProps> = ({ children, launch }) => {
  const { height, width } = useWindowDimensions();
  const opts = {
    height: width < 1000 ? '200' : '390',
    width: width < 1000 ? '100%' : '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Popup
      trigger={
        <button type="button" className="mt-0 rounded-[50%] !border-[#36d7b7]">
          {children}
        </button>
      }
      onClose={() => {}}
      modal
    >
      {
        ((close: any) => (
          <FadeUp>
            <div
              onClick={(event) => {
                event.stopPropagation();
              }}
              className="flex flex-col items-stretch justify-center "
            >
              <div className="p-[1rem] flex flex-col xl:flex-row gap-[1rem]">
                <div className="mx-[auto]">
                  <YouTube
                    videoId={launch.links.video_link.split('=')[1]}
                    opts={opts}
                  />
                </div>
                <Box className="border-[2px] flex-1 p-[1rem] rounded-sm gap-[0.1rem]  xl:gap-[0.5rem] flex flex-col">
                  <h1 className="underline underline-gray-700">Details</h1>
                  <h3>Rocket Type: {launch.rocket.rocket_type}</h3>
                  <h3>Name: {launch.rocket.rocket_name}</h3>
                  <h3>
                    Rocket Reused:
                    <span
                      className={`${!launch.rocket.reused && 'text-[red]'}`}
                    >
                      {' '}
                      {launch.rocket.reused ?? '--NO DATA--'}
                    </span>
                  </h3>
                  <h3>
                    Launch Status:{' '}
                    <span
                      className={`${!launch.launch_success && 'text-[red]'}`}
                    >
                      {' '}
                      {launch.launch_success ?? '--NO DATA--'}
                    </span>
                  </h3>
                  <Text mb={2} fontSize="sm">
                    Details:
                    <span
                      className={`${!launch.launch_success && 'text-[red]'}`}
                    >
                      {launch.launch_success ?? '--NO DATA--'}
                    </span>
                  </Text>
                  <Text mb={2} fontSize="sm">
                    Launch Site Name:
                    <span
                      className={`${
                        !launch?.launch_site?.site_name && 'text-[red]'
                      }`}
                    >
                      {launch?.launch_site?.site_name ?? '--NO DATA--'}
                    </span>
                  </Text>
                  <Text mb={2} fontSize="sm">
                    Launch Site Name Long:
                    <span
                      className={`${
                        !launch?.launch_site?.site_name_long && 'text-[red]'
                      }`}
                    >
                      {launch?.launch_site?.site_name_long ?? '--NO DATA--'}
                    </span>
                  </Text>
                  <Text mb={2} fontSize="sm">
                    Launch Date/Time:{' '}
                    {launch.launch_date_local.replace('T', ' ')}
                  </Text>
                </Box>
              </div>
              <div className=" bg-[#36d7b7] h-[2px] rounded-md  mb-[1rem] " />
              <h1 className="underline underline-gray-700 mx-[auto]">Links</h1>
              <Flex
                className="gap-[1rem] cursor-pointer justify-center flex-wrap"
                p={4}
                borderBottomWidth="1px"
              >
                {[
                  {
                    link: launch.links.article_link,
                    Icon: MdOutlineArticle,
                    info: 'Article',
                  },
                  {
                    link: launch.links.mission_patch,
                    Icon: RiMistFill,
                    info: 'mission_patch',
                  },
                  {
                    link: launch.links.mission_patch_small,
                    Icon: GiSubmarineMissile,
                    info: 'mission_patch_small',
                  },
                  {
                    link: launch.links.presskit,
                    Icon: FaCompressAlt,
                    info: 'presskit',
                  },
                  {
                    link: launch.links.reddit_campaign,
                    Icon: AiFillRedditCircle,
                    info: 'reddit_campaign',
                  },
                  {
                    link: launch.links.reddit_launch,
                    Icon: AiFillRedditCircle,
                    info: 'reddit_launch',
                  },
                  {
                    link: launch.links.reddit_media,
                    Icon: AiFillRedditCircle,
                    info: 'reddit_media',
                  },
                  {
                    link: launch.links.reddit_recovery,
                    Icon: AiFillRedditCircle,
                    info: 'reddit_recovery',
                  },
                  {
                    link: launch.links.wikipedia,
                    Icon: BsWikipedia,
                    info: 'wikipedia',
                  },
                ].map(
                  ({ link, Icon, info }, index: number) =>
                    link && (
                      <Button
                        variant="outline"
                        key={index}
                        className="flex items-center justify-center gap-1 cursor-pointer !border-[2px]  p-[.2rem] rounded-md px-[0.58rem]"
                        onClick={() => {
                          window.location.href = link;
                        }}
                        leftIcon={<Icon />}
                      >
                        <Text className="text-[1rem] ">{info}</Text>
                      </Button>
                    )
                )}
              </Flex>
            </div>
          </FadeUp>
        )) as any
      }
    </Popup>
  );
};

export default PopTop;
