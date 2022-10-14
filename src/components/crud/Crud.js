import Axios from 'axios';
import { useEffect, useState } from 'react';
import '../crud/Crudee.css';
// import Update from "./Update";
import { toast } from 'react-toastify';
import like from '../../components/assets/img/like.png';
export const baseUrl = 'https://anugrah-backend.dennisdeveza.repl.co';

function Crud() {
  const [foodName, setfoodName] = useState('');
  const [days, setDays] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [fileName, setFileName] = useState('');
  const [forceRender, setForceRender] = useState(false);
  const [loading, setLoading] = useState(false);

  // i may have to change this to upload file

  const Likes = async (id, currLikes) => {
    await Axios.patch(`${baseUrl}/insert`, {
      likes: currLikes + 1,
      id: id,
    });
    setForceRender(!forceRender);
  };

  // form tag
  const onChangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const changeOnClick = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('foodName', foodName);
    formData.append('days', days);
    formData.append('articleImage', fileName);

    /*    await Axios.post(`${baseUrl}/insert`, formData)
      .then((res) => {
        setFoodList((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
 */
    toast.promise(Axios.post(`${baseUrl}/insert`, formData), {
      pending: {
        render() {
          setLoading(true);
          return 'Image is uploading';
        },
      },
      success: {
        render({ data }) {
          console.log({ data });
          setFoodList((prev) => [...prev, data.data]);
          setfoodName('');
          setDays('');
          setFileName('');
          setLoading(false);
          setForceRender(!forceRender);
          return 'Successfully Added';
        },
        autoClose: 1000,
        hideProgressBar: true,
      },
    });
  };

  // for update

  const clickUpdate = async (id) => {
    /*   e.preventDefault(); */

    const formData = new FormData();

    formData.append('foodName', foodName);
    formData.append('days', days);
    formData.append('articleImage', fileName);
    formData.append('id', id);

    await Axios.put(`${baseUrl}/update`, formData)
      .then((res) => {
        const updatedValue = res.data;
        console.log({ updatedValue });
        setFoodList((prev) =>
          prev.map((p) => {
            if (p._id === res.data._id) {
              return { ...p, updatedValue };
            }
            return p;
          })
        );
        setForceRender(!forceRender);
      })
      .catch((err) => {
        console.log(err);
        console.log('updated');
      });

    setfoodName('');
    setDays('');
    setFileName('');
    /* */
  };

  const deletefood = (id) => {
    Axios.delete(`${baseUrl}/delete/${id}`);
    setFoodList((prev) => prev.filter((p) => p._id !== id));
  };

  useEffect(() => {
    Axios.get(`${baseUrl}/read`).then((response) => {
      console.log({ data: response.data });
      setFoodList(response.data);
    });

    return () => {
      setForceRender(!forceRender);
    };
  }, [forceRender]);

  // this is to delete data

  return (
    <div className='App'>
      <h1>CRUD App With MERN</h1>

      {/* form starts here  */}
      <div className='form'>
        <form onSubmit={changeOnClick} encType='multipart/form-data'>
          <label>Your Name</label> <br />
          <input
            type='text'
            placeholder='Your Name here!'
            onChange={(e) => {
              setfoodName(e.target.value);
            }}
          />{' '}
          <br />
          <label>Comments </label> <br />
          <textarea
            className='comment'
            type='text'
            placeholder='Your comments here!'
            onChange={(e) => {
              setDays(e.target.value);
            }}
          />{' '}
          <br />
          <label>Upload Your Image!</label>
          <br />
          <input
            type='file'
            filename='articleImage'
            onChange={(e) => {
              setFileName(e.target.files[0]);
            }}
          />
          <br />
          <button
            className='btn'
            type='submit'
            onChange={onChangeFile}
            disabled={loading}
          >
            Add to List
          </button>
        </form>
      </div>
      {/* form ends here  */}

      <hr />
      <div>
        <h1>Reading Data..</h1>
        {foodList.map((val, key) => {
          return (
            <div className='food' key={key}>
              <h1>{val.foodName}</h1>
              <h1>{val.daysSinceIAte}</h1>
              <p>{val.likes ?? 0}</p>
              <div className='imgg'>
                <img
                  src={`data:image/png;base64,${val.articleImage.data}`}
                  alt='my uploaded imgs..'
                />
              </div>

              {/* like here  */}
              <div className='like'>
                <img
                  id='lik'
                  src={like}
                  alt='like'
                  onClick={() => Likes(val._id, val.likes ?? 0)}
                />

                <p id='noc'>{val.likes ?? 0}</p>
              </div>

              {/* update is here  */}

              <input
                type='text'
                onChange={(e) => {
                  setfoodName(e.target.value);
                }}
                placeholder='New Food Name'
              />
              <input
                type='text'
                onChange={(e) => {
                  setDays(e.target.value);
                }}
                placeholder='updated Days'
              />
              <input
                type='file'
                filename='articleImage'
                onChange={(e) => {
                  setFileName(e.target.files[0]);
                }}
                placeholder='Upload image'
              />
              <button
                type='button'
                className='btn'
                onClick={() => clickUpdate(val._id)}
              >
                Update
              </button>

              <button
                className='btn'
                type='button'
                onClick={() => deletefood(val._id)}
              >
                Delete
              </button>

              {/* <button className="btn" onClick={() => deletefood(val._id)}>Delete</button> */}
              {/* <button  className="btn"  onClick={() => updatefood(val._id)}>Update</button> */}
            </div>
          );
        })}

        {/* <button onClick={() => deletefood(val._id)}>Delete</button> */}
      </div>
    </div>
  );
}

export default Crud;
