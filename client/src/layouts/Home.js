import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Fab, Action } from 'react-tiny-fab';
import styled from 'styled-components'

import { faPlus, faStream, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Styles = styled.div`
  .tooltips {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
  }
  
  .tooltips .tooltiptext {
    visibility: hidden;
    width: 100px;
    background-color: black;
    color: #bbb;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    padding: 10px 0;
    
    /* Position the tooltips */
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 50%;
    margin-left: -30px;
  }
  
  .tooltips:hover .tooltiptext {
    visibility: visible;
  }
`;

function Home() {

    return (
        <Styles>
            <Fab
                icon={<FontAwesomeIcon icon={faPlus} />}
                mainButtonStyles={fab_styles}
            >
                <Link to={`/new-thread`}>
                    <Action
                        text="Create Thread"
                        style={fab_styles}
                    >
                        <FontAwesomeIcon icon={faStream} />
                    </Action>
                </Link>
                <Link to={`/create-community`}>
                    <Action
                        text="Create Community"
                        style={fab_styles}
                    >
                        <FontAwesomeIcon icon={faUsers} />
                    </Action>
                </Link>
            </Fab>

        </Styles>
    )
}

const fab_styles = {
    background: "#007bff"
};

export default Home