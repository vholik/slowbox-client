import styled from "styled-components";
import searchIcon from "../public/images/header/search-icon.svg";
import chevronDown from "../public/images/header/chevron-down.svg";
import Image from "next/image";
import { KeyboardEventHandler, useState } from "react";
import Router from "next/router";
import { searchTracks } from "../store/reducers/track/SearchSlice";
import { useAppDispatch } from "../store/hooks/redux";

interface KeyboardEvent {
  key: string;
}

export default function Header() {
  const dispatch = useAppDispatch();

  const [keywords, setKeywords] = useState("");

  const searchHandler = () => {
    if (keywords.length > 3) {
      dispatch(searchTracks(keywords.replace(/[^a-zA-Z0-9]/g, "")));
      console.log(keywords.replace(/[^a-zA-Z0-9]/g, ""));
      Router.push(`/search/${keywords.replace(/[^a-zA-Z0-9]/g, " ")}`);
    }
  };

  // Enter search
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      searchHandler();
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };
  return (
    <StyledHeader>
      <div className="container">
        <div className="header-inner">
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              onChange={inputHandler}
              onKeyDown={handleKeyDown}
            />
            <button className="search-button" onClick={searchHandler}>
              <Image src={searchIcon} alt="Search" />
            </button>
          </div>
          <div className="account">
            <div className="account-button">
              Account <Image src={chevronDown} alt="Settings" />
            </div>
            <div className="account-modal">
              <ul>
                <li>Settings</li>
                <li>About</li>
                <li>Log out</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  .container {
    padding-top: 25px;
    max-width: none;
    margin-right: 100px;
  }
  .header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .search {
      font-family: var(--font);
      border-radius: 35px;
      padding: 20px 18px;
      background-color: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      cursor: default;
    }
    .search-button {
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    .search-input {
      font-family: var(--font);
      outline: none;
      border: none;
      background-color: transparent;
      color: white;
      font-size: 16px;
      width: 300px;
      &::placeholder {
        color: var(--grey-30);
        opacity: 1;
      }
    }
    .account {
      position: relative;
      &:hover .account-modal {
        opacity: 1;
        pointer-events: all;
      }
      .account-button {
        position: sticky;
        font-family: var(--font);
        border-radius: 35px;
        padding: 20px 18px;
        background-color: #282828;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        z-index: 5;
        cursor: pointer;
      }
      .account-modal {
        opacity: 0;
        pointer-events: none;
        width: 126px;
        background-color: #282828;
        position: absolute;
        left: 0;
        padding: 64px 0 0px 0px;
        top: 0px;
        border-radius: 35px;
        z-index: 3;
        transition: opacity 0.2s ease;
        ul {
          list-style: none;
          font-size: 16px;
          li {
            padding: 15px 0;
            cursor: pointer;
            padding-left: 15px;
            &:nth-child(3) {
              border-radius: 0 0 35px 35px;
              padding-bottom: 20px;
            }
            &:hover {
              background-color: rgba(0, 0, 0, 0.1);
            }
          }
        }
      }
    }
  }
`;
