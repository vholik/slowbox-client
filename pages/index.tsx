import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import playIcon from "../public/images/player/play-icon.svg";
import Image from "next/image";
import Playlist from "../components/Playlist";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { fetchOriginals } from "../store/reducers/playlist/OriginalsSlice";
import Link from "next/link";
import Tracks from "./tracks";
import instance from "../axios";
import { addActiveTrack } from "../store/reducers/player/PlayerSlice";
import { IPlaylist } from "../types/playlist";
import { fetchTracks } from "../store/reducers/track/TracksSlice";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { originalPlaylists, isLoading, error } = useAppSelector(
    (store) => store.originalsReducer
  );

  const [playlist, setPlaylist] = useState<IPlaylist>({
    _id: "",
    name: "",
    user: "",
    cover: "",
    tracks: [],
  });

  useEffect(() => {
    dispatch(fetchOriginals())
      .unwrap()
      .then((playlists) => {
        console.log(playlists);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (originalPlaylists[1]) {
      instance.get(`/playlists/${originalPlaylists[1]}`).then(({ data }) => {
        setPlaylist(data);
      });
    }
  }, [originalPlaylists]);

  return (
    <StyledHome>
      <div className="container">
        <Head>
          <title>Slowbox - Main page</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="popular-playlist">
          <div className="subtitle">Popular</div>
          <h1 className="title">Trending slowbees in one playlist</h1>
          <div className="buttons-wrapper">
            <div className="btn play-button">
              <Image src={playIcon} alt="Play" height={20} width={20} />
              Play
            </div>
            {originalPlaylists[1] && (
              <Link href={`/playlists/${originalPlaylists[1]}`}>
                <div className="btn">View playlist</div>
              </Link>
            )}
          </div>
        </div>
        <div className="original-playlists">
          <div className="subtitle">Playlists</div>
          <h1 className="title">Original Slowbee playlists</h1>
          <div className="playlists-wrapper">
            {originalPlaylists.map((id) => (
              <Link href={`/playlists/${id}`} key={id}>
                <div className="playlist-inner">
                  <Playlist id={id} />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="tracks-wrapper">
          <Tracks />
        </div>
      </div>
    </StyledHome>
  );
};

const StyledHome = styled.div`
  .popular-playlist {
    padding: 35px;
    z-index: 0;
    height: max-content;
    position: sticky;
    background: radial-gradient(
      179.7% 286.19% at 88.21% -8.36%,
      #fe4daa 0%,
      #8e78fe 16.15%,
      #e93ffa 21.88%,
      #324db1 52.08%
    );
    border-radius: 35px;
    width: 700px;
    filter: drop-shadow(11px 12px 53px rgba(49, 75, 174, 0.3));
    .title {
      width: 70%;
      font-size: 48px;
    }
  }
  .play-button {
    background-color: white;
    color: var(--dark);
    &:hover {
      background-color: #d6d6d6;
    }
  }
  .buttons-wrapper {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-top: 45px;
  }
  .original-playlists {
    margin-top: 80px;
    .playlists-wrapper {
      margin-top: 25px;
      display: flex;
      gap: 60px;
    }
  }
  .tracks-wrapper {
    .container {
      margin-left: 0;
      padding-left: 0;
      padding-top: 0;
      margin-top: 80px;
      img {
        background-color: transparent;
      }
    }
    &__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__link {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export default Home;
