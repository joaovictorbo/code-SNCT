import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchTodos } from "../../redux/slice/todo";
import React from "react";
import grupo from "../../Componentes/assets/grupo2.png";
import Modal from "../../Componentes/modalcopy";
import YouTube from 'react-youtube';

const Dados = () => {
  const [posts, setPosts] = React.useState([]);
  const [escolas, setEscolas] = React.useState([]);
  const [selectedPolo, setSelectedPolo] = React.useState(null); // adicionamos o estado para armazenar o polo selecionado


  const dataurl = "http://26.226.78.158:8000/Turma/";
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const opts = {
    height: '200',
    width: '289',
  }

  const votar = async (id) => {
    const response = await axios.patch(dataurl + 'Votar/' + id + '/');
  }

  const getPosts = async () => {
    try {
      const response = await axios.get(dataurl);
      const data = response.data;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEscola = async () => {
    try {
      const response = await axios.get(dataurl + 'escola/');
      const data = response.data;
      setEscolas(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value; // armazenamos o valor selecionado
    setSelectedPolo(selectedValue); // atualizamos o estado com o polo selecionado
    // getTurmas(selectedValue); // chamamos a função getTurmas com o valor selecionado
  }

  React.useEffect(() => {
    dispatch(fetchTodos(selectedPolo))
    getEscola();

    getPosts();

  }, [selectedPolo]);

  return (
    <div
      className="main-background bg-image"
      style={{
        background: `url(${grupo}) no-repeat center center fixed`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          backgroundImage: "linear-gradient(to right, #E2595E, #7AF0F6)",
        }}
      >
        <p className="display-6 text-center text-wrap ">
          Festival de Aplicativos da Iniciativa CODE
        </p>
        <p className="display-7 text-center text-wrap">Página de votação</p>
        <div className="d-flex justify-content-center">
          <select className="display-8 text-center custom-select custom-select-lg mb-3" onChange={handleSelectChange}>
            <option value={-1} >Selecione as escolas</option>
            {escolas.length === 0 ? (
              <option key={0} value={0}>vazio</option>
            ) : (
              escolas['results'].map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))
            )}
          </select>
        </div>

      </div>
      <div className="container">
        <div className="row justify-content-center">
          {state.todo.data && state.todo.data['results'].map((post) => (
            <div key={post.id} className="col-sm pb-4 pt-4">
              <div
                key={post.id}
                className="card"
                style={{
                  width: "18rem",
                  backgroundImage:
                    "linear-gradient(to right, #D9666B, #98C5CB)",
                }}
              >
                <YouTube videoId={post.linkYoutube} opts={opts} />

                <div className="card-body">
                  <h5 className="card-title">{post.titulo}</h5>
                  <p className="card-text">{post.descricaoshort}</p>
                  <p className="m-0">
                    votos:{post.votos}


                    <button
                      className="btn btn-primary votar"
                      style={{ float: "right" }}
                      onClick={(e) => {
                        votar(post.id);
                        dispatch(fetchTodos(selectedPolo));

                      }}
                    >
                      votar
                    </button>
                  </p>

                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default Dados;
