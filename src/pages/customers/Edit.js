import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui//core/Button";
import axios from "axios";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
  },
}));

const Edit = () => {
  const classes = useStyles();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: {
        value: '',
        error: false,
      },
      job: {
        value: '',
        error: false,
      },
  });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`).then((response) => {
      const { data } = response.data;
      setForm({
        name: {
          value: data.first_name,
          error: false,
        },
        job: {
          value: data.job,
          error: false,
        },
      });
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: {
        value,
      },
    });
  };

  const handleRegisterButton = () => {
    let hasError = false;

    let newFormState = {
      ...form,
    };

    if (!form.name.value) {
      hasError = true;

      newFormState.name = {
        value: form.name.value,
        error: true,
        helperText: "Digite o campo nome corretamente!",
      };
    }

    if (!form.job.value) {
      hasError = true;

      newFormState.job = {
        value: form.job.value,
        error: true,
        helperText: "Digite o campo cargo corretamente!",
      };
    }

    if (hasError) {
      return setForm(newFormState);
    }

    axios
      .put(`https://reqres.in/api/users/${id}`, {
        name: form.name.value,
        job: form.job.value,
      })
      .then((response) => {
        console.log("ok", response);
      });
  };

  return (
    <>
      <div className={classes.wrapper}>
        <TextField
          error={form.name.error}
          helperText={form.name.error ? form.name.helperText : ""}
          label="Digite o seu nome"
          name="name"
          value={form.name.value}
          variant="outlined"
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.wrapper}>
        <TextField
          error={form.job.error}
          helperText={form.job.error ? form.job.helperText : ""}
          label="Digite o seu cargo"
          name="job"
          value={form.job.value}
          variant="outlined"
          onChange={handleInputChange}
        />
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegisterButton}
        >
          Salvar Alterações
        </Button>
      </div>
    </>
  );
};

export default Edit;
