// import { Box, Button, Container, Grid, Heading, Image, Input, Select, VStack } from '@chakra-ui/react'
// import React, { useState } from 'react'
// import Sidebar from '../Sidebar'


// export const fileUploadcss={
//   cursor:"pointer",
//   marginLeft:"-5%",
//   width:"110%",
//   border:"none",
//   height:"100%",
//   color:"#ECC94B",
//   backgroundColor:"white"
// }
// const fileUploadStyle={
//   "&::file-selector-button":fileUploadcss
// }
// const CreateCourse = () => {
//   const [title,setTitle]=useState("");
//   const [description,setDescription]=useState("");
//   const [createdby,setCreatedBy]=useState("");
//   const [category,setCategory]=useState("");
//   const [image,setImage]=useState("");
//   const [imagePrev,setImagePrev]=useState("");
//   // const [title,setTitle]=useState("");
  
//   const changeImageHandler=(e)=>{
//     const file=e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend=()=>{
//        setImagePrev(reader.result);
//        setImage(file);
//     };
//   };

//   const categories = [
//     "Web development" ,
//     "Android app development" ,
//     "Ethical Hacking" ,
//     "Artificial Intelligence",
//     "Game Development",
//     "Python", 
//     "Java", 
//     "Data structures and Algorithms",
//     "Competitive Programming",
//     "Cryptography"
//   ]
//   return (
//     <Grid
//     minH={"100vh"}
//     templateColumns={["1fr","5fr 1fr"]}
//     css={{
//         cursor:"url(),default"
//     }}
//     >
//     <Container
//     py="16"
//     >
//     <form

//     >
//     <Heading 
//      textTransform={"uppercase"}
//      children="Create Course"
//      my="16"
//      textAlign={["center","left"]}
//      />
//       <VStack
//       m="auto"
//       spacing={"8"}
//       >
//        <Input
//          value={title}
//          onChange={e=>setTitle(e.target.value)}
//          placeholder="Title"
//          type={"text"}
//          focusBorderColor="purple.300"
//        />{' '}
//          <Input
//          value={description}
//          onChange={e=>setDescription(e.target.value)}
//          placeholder="Description"
//          type={"text"}
//          focusBorderColor="purple.300"
//        />{' '}
//          <Input
//          value={createdby}
//          onChange={e=>setCreatedBy(e.target.value)}
//          placeholder="Created by"
//          type={"text"}
//          focusBorderColor="purple.300"
//        />
//        <Select
//         focusBorderColor="purple.300"
//         value={category}
//         onChange={e=>setCategory(e.target.value)}

//        >
//         <option value="">Category</option>
//         {categories.map(item=>(
//             <option key={item} value={item}>{item}</option>
//         ))}
//        </Select>
//        <Input 
//        accept='image/*'
//        type={"file"}
//        focusBorderColor='purple.500'
//        css={
//         {
//           '&::file-selector-button':{
//             ...fileUploadcss,
//             color:'purple'
//           }
//         }
//        }
//        onChange={changeImageHandler}
//        />
       
//        {imagePrev && (
//         <Image src={imagePrev} boxSize="64" objectFit={"contain"} />
//        )}

//        <Button w="full" colorScheme={"purple"}>Create </Button>

//       </VStack>
//     </form>

//     </Container>
    
//     <Sidebar/>

//     </Grid>
//   )
// }

// export default CreateCourse;




import {
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cursor from "../../../assests/Images/cursor.png";
import { createCourse } from '../../../redux/actions/admin';
import { fileUploadcss } from '../../auth/Register';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.admin);

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);
    dispatch(createCourse(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Container py="16">
        <form onSubmit={submitHandler}>
          <Heading
            textTransform={'uppercase'}
            children="Create Course"
            my="16"
            textAlign={['center', 'left']}
          />

          <VStack m="auto" spacing={'8'}>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type={'text'}
              focusBorderColor="purple.300"
            />{' '}
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Input
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Select
              focusBorderColor="purple.300"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Category</option>

              {categories.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Input
              accept="image/*"
              required
              type={'file'}
              focusBorderColor="purple.300"
              css={{
                '&::file-selector-button': {
                  ...fileUploadcss,
                  color: 'purple',
                },
              }}
              onChange={changeImageHandler}
            />
            {imagePrev && (
              <Image src={imagePrev} boxSize="64" objectFit={'contain'} />
            )}
            <Button
              isLoading={loading}
              w="full"
              colorScheme={'purple'}
              type="submit"
            >
              Create
            </Button>
          </VStack>
        </form>
      </Container>

      <Sidebar />
    </Grid>
  );
};

export default CreateCourse;

