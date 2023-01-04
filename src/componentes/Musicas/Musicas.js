import React, { useEffect, useState } from "react";
import {
  Botao,
  ContainerInputs,
  ContainerMusicas,
  InputMusica,
  Musica
} from "./styled";
import axios from "axios";

const musicasLocal = [
  {
    artist: "Artista 1",
    id: "1",
    name: "Musica1",
    url: "http://spoti4.future4.com.br/1.mp3"
  },
  {
    artist: "Artista 2",
    id: "2",
    name: "Musica2",
    url: "http://spoti4.future4.com.br/2.mp3"
  },
  {
    artist: "Artista 3",
    id: "3",
    name: "Musica3",
    url: "http://spoti4.future4.com.br/3.mp3"
  }
];

export default function Musicas(props) {
  const [musicas, setMusicas] = useState([]);
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    getPlaylistTracks();
  }, []);
  useEffect(() => {
    addTrackToPlaylist();
  }, []);
  const getPlaylistTracks = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        {
          headers: { Authorization: "ana-sammi-barbosa" }
        }
      )
      .then((res) => {
        setMusicas(res.data.result.tracks);
      })
      .catch((err) => {
        console.log(err.res);
      });
  };
  const body = {
    name: name,
    artist: artist,
    url: url
  };

  const addTrackToPlaylist = () => {
    axios
      .post(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks`,
        body,
        { headers: { Authorization: "ana-sammi-barbosa" } }
      )
      .then((res) => {
        console.log(res.data);
        getPlaylistTracks();
        setName();
        setArtist();
        setUrl();
      })
      .catch((err) => console.log(err.res));
  };

  const removeTrackFromPlaylist = (id) => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${props.playlist.id}/tracks/${id}`,
        { headers: { Authorization: "ana-sammi-barbosa" } }
      )
      .then((res) => {
        alert("excluido");
        getPlaylistTracks();
        setName();
        setArtist();
        setUrl();
      })
      .catch((err) => console.log(err.res));
  };

  return (
    <ContainerMusicas>
      <h2>{props.playlist.name}</h2>
      {musicas.map((musica) => {
        return (
          <Musica key={musica.id}>
            <h3>
              {musica.name} - {musica.artist}
            </h3>
            <audio src={musica.url} controls />
            <button onClick={() => removeTrackFromPlaylist(musica.id)}>
              X
            </button>
          </Musica>
        );
      })}
      <ContainerInputs>
        <div>
          <button onClick={() => props.deletePlaylist(props.playlist.id)}>
            excluir
          </button>
        </div>
        <InputMusica
          placeholder="artista"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <InputMusica
          placeholder="musica"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputMusica
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Botao onClick={addTrackToPlaylist}>Adicionar musica</Botao>
      </ContainerInputs>
    </ContainerMusicas>
  );
}
