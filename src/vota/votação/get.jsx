import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchTodos } from "../../redux/slice/todo";
import React from "react";
import grupo from "../../Componentes/assets/grupo2.png";
import info from "../../Componentes/assets/maisinfo.png";
import Modal from "../../Componentes/modal";

const Dados = () => {
  const [posts, setPosts] = React.useState([]);
  const [escolas, setEscolas] = React.useState([]);
  const dataurl = "http://192.168.15.150:8000/Turma/";
  const dispatch = useDispatch();
  const state = useSelector((state) => state);


  const votar = async (id)=>{
    const response = await axios.patch(dataurl+'Votar/'+id+'/');
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
      const response = await axios.get(dataurl+'escola/');
      const data = response.data;
      setEscolas(data);
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() => {
      dispatch(fetchTodos())
      getPosts();
      getEscola();
  }, []);

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

        <select className="display-8 text-center custom-select custom-select-lg mb-3" >
          <option value="DEFAULT">Selecione as escolas</option>
          {escolas.length === 0 ? (
            <option key={0} value={0}>vaziu</option>
          ) : (
            escolas['results'].map((e) => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))
          )}
        </select>

      </div>
      <div className="container">
        <div className="row">
        {state.todo.data && state.todo.data['results'].map( (post) => (
              <div key={post.id} className="col-sm pb-4 h-40 w-30">
                <div
                  key={post.id}
                  className="card"
                  style={{
                    width: "18rem",
                    backgroundImage:
                      "linear-gradient(to right, #D9666B, #98C5CB)",
                  }}
                >
                  <img
                    src={post.imagem}
                    className="card-img-top"
                    alt={post.alt}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{post.titulo}</h5>
                    <p className="card-text">{post.descricaoshort}</p>

                    <Modal posts={post} />
                    <p>
                      votos:{post.votos}
                    </p>

                    <button
                      className="btn btn-primary votar"
                      style={{ float: "right" }}
                      onClick={(e) =>{
                        votar(post.id);
                        dispatch(fetchTodos());
                      
                      }}
                    >
                      votar
                    </button>
                    
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
