import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actionsCreator } from "../actions/actionsCreator";
import { helperHttp } from "../helpers/helpHttp";
import {
  NO_DATA,
  READ_ALL_DATA,
  CREATE_DATA,
  UPDATE_DATA,
  DELETE_DATA,
} from "../types";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";

const CrudApi = () => {
  const dispatch = useDispatch(actionsCreator);
  const { bd } = useSelector((state) => state.crudBD);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helperHttp();
  let url = "http://localhost:5000/nuevo_testamento";

  useEffect(() => {
    setLoading(true);
    api.get(url).then((res) => {
      if (!res.err) {
        (() => dispatch(actionsCreator(READ_ALL_DATA, res)))();
        setError(null);
      } else {
        (() => dispatch(actionsCreator(NO_DATA)))();
        setError(res);
      }
      setLoading(false);
    });
  }, []);

  const createData = (data) => {
    data.id = Date.now();

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      if (!res.err) {
        (() => dispatch(actionsCreator(CREATE_DATA, res)))();
      } else {
        setError(res);
      }
    });
  };

  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.put(endpoint, options).then((res) => {
      if (!res.err) {
        (() => dispatch(actionsCreator(UPDATE_DATA, data)))();
      } else {
        setError(res);
      }
    });
  };

  const deleteData = ({ name, id }) => {
    let isConfirm = window.confirm(
      `¿Está seguro de que desea eliminar el registro con nombre: ${name}?`
    );
    if (isConfirm) {
      let endpoint = `${url}/${id}`;
      api.del(endpoint).then((res) => {
        if (!res.err) {
          (() => dispatch(actionsCreator(DELETE_DATA, id)))();
        } else {
          setError(res);
        }
      });
    }
  };
  return (
    <div>
      <h2>CRUD API con Redux</h2>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
        />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {bd && (
          <CrudTable
            data={bd}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
          />
        )}
      </article>
    </div>
  );
};

export default CrudApi;
