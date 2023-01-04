import React, { useEffect, useState } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

const playlistsLocal = [
  {
    id: 1,
    name: "Playlist 1"
  },
  {
    id: 2,
    name: "Playlist 2"
  },
  {
    id: 3,
    name: "Playlist 3"
  },
  {
    id: 4,
    name: "Playlist 4"
  }
];

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [pesquisa, setPesquisa] = useState("");
  const [deletar, setDeletar] = useState([]);

  useEffect(() => {
    getAllPlayList();
  }, []);

  const getAllPlayList = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists`,
        { headers: { Authorization: "ana-sammi-barbosa" } }
      )
      .then((response) => {
        setPlaylists(response.data.result.list);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const searchPlaylist = async (pesquisa) => {
    try {
      const response = await axios.get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${pesquisa}`,
        { headers: { Authorization: "ana-sammi-barbosa" } }
      );
      setPlaylists(response.data.result.playlist);
      setPesquisa("");
    } catch (error) {
      console.log(error.response);
    }
  };
  const deletePlaylist = async (id) => {
    try {
      const response = await axios.delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${id}`,
        { headers: { Authorization: "ana-sammi-barbosa" } }
      );
      getAllPlayList();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      <input
        placeholder="digite a playlist"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
      />
      <button onClick={() => searchPlaylist(pesquisa)}>pesquisar</button>
      <button onClick={getAllPlayList}>voltar</button>

      {playlists.map((playlist) => {
        return (
          <Musicas
            key={playlist.id}
            playlist={playlist}
            deletePlaylist={deletePlaylist}
          />
        );
      })}
    </div>
  );
}

export default Playlists;
