// import {React , useState} from 'react';
// import {Container, Heading, HStack, Input, Text , Button,css, Stack, VStack, Image} from  '@chakra-ui/react';
// import { Link } from 'react-router-dom';

// const Course = ({views,title,imagesrc,id,addToPlaylistHandler,creator,description,lecturecount})=>{
//   return(
//     <div>
//       <VStack
//       className='course'
//       alignItems={["center","flex-start"]}
//       >
//       <Image src={imagesrc} boxSize="60" objectFit={"contain"}/>
//       <Heading  
//        textAlign={["center","left"]} 
//        maxw="200px" 
//        fontFamily={"sans-serif"}
//        noOfLines="3" 
//        size={"sm"}
//        children={title} />
//        <Text children={description}  noOfLines={2} />
//        <HStack>
//        <Text children={"Creator"}  textTransform={"uppercase"} fontWeight={"bold"} />
//        <Text children={"Aditya raj"}  textTransform={"uppercase"} fontWeight={"medium"} fontFamily={"body"}/>
//        </HStack>
//        <Heading textAlign={"center"}  size="xs" children={`lectures ${lecturecount}`}  textTransform={"uppercase"} />
//        <Heading   size="xs" children={`views ${views}`}  textTransform={"uppercase"} />

//        <Stack direction={["column","row"]} alignItems="center">
//          <Link to={`/course/${id}`} >
//           <Button colorScheme={"yellow"}>Watch Now</Button>
//           </Link>
//           <Button variant={"ghost"} colorScheme={"yellow"} onClick={()=>addToPlaylistHandler(id)}>Add To PlayList </Button>
//        </Stack>
//       </VStack>
//     </div>
//   )

// }

// function Courses() {
//   const [keyword,setkeyword]=useState("");
//   const [category,setcategory]=useState("");
//   const addToPlaylistHandler=()=>{
//     console.log("addded to playlist");
//   }
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
//      <Container 
//       minH={"95vh"}
//       maxW={"container.lg"}
//       paddingY="8"
//       >
//         <Heading
//         children="All Courses"
//         m={"8"}
//         />
//         <Input 
//          value={keyword}
//          onChange={e => setkeyword(e.target.value)} 
//          placeholder="search a course.." 
//          type={"text"} 
//          focusBorderColor={"yellow.500"}
//          color="white"
//          />

//          <HStack overflowX={"auto"}
//           paddingY="8"
//           >
//           {
//             categories.map((item,index)=>( 
//               <Button
//               minW="60"
//               key={index}
//               onClick={()=>setcategory(item)}
//               >
//                 <Text children={item}/>
//               </Button>
//             ))
//           }
          
//          </HStack>
//          <Stack
//          direction={["column","row"]}
//          flexWrap={"wrap"}
//          justifyContent={["flex-start","space-evenly"]}
//          alignItems={["center","flex-start"]}
//          >
//          <Course 
//           title={"JAVA"}
//           id={"sample"}
//           views={20}
//           imagesrc={"https://cdn.pixabay.com/photo/2014/04/03/11/08/tea-311845_960_720.png"}
//           description={"Best Java Course"}
//           lecturecount={30}
//           addToPlaylistHandler={addToPlaylistHandler}
//           />
//              <Course 
//           title={"Django"}
//           id={"sample"}
//           views={20}
//           imagesrc={"https://cdn.pixabay.com/photo/2014/05/07/15/19/django-339744_960_720.png"}
//           description={"Best Dajngo Course"}
//           lecturecount={39}
//           addToPlaylistHandler={addToPlaylistHandler}
//           />
//              <Course 
//           title={"Front-End"}
//           id={"sample"}
//           views={20}
//           imagesrc={"https://cdn.pixabay.com/photo/2016/09/08/04/12/programmer-1653351_960_720.png"}
//           description={"Best Front end Course"}
//           lecturecount={38}
//           addToPlaylistHandler={addToPlaylistHandler}
//           />
//               <Course 
//           title={"Ethical Hacking"}
//           id={"sample"}
//           views={20}
//           imagesrc={"https://cdn.pixabay.com/photo/2014/02/13/07/28/security-265130_960_720.jpg"}
//           description={"Best Ethical Hacking Course"}
//           lecturecount={35}
//           addToPlaylistHandler={addToPlaylistHandler}
//           />
//          </Stack>

//      </Container>
//   )
// }

// export default Courses;



import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack className="course" alignItems={['center', 'flex-start']}>
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        size={'sm'}
        fontFamily={'sans-serif'}
        noOfLines={3}
        children={title}
      />
      <Text noOfLines={2} children={description} />

      <HStack>
        <Text
          fontWeight={'bold'}
          textTransform="uppercase"
          children={'Creator'}
        />

        <Text
          fontFamily={'body'}
          textTransform="uppercase"
          children={creator}
        />
      </HStack>

      <Heading
        textAlign={'center'}
        size="xs"
        children={`Lectures - ${lectureCount}`}
        textTransform="uppercase"
      />

      <Heading
        size="xs"
        children={`Views - ${views}`}
        textTransform="uppercase"
      />

      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={'yellow'}>Watch Now</Button>
        </Link>
        <Button
          isLoading={loading}
          variant={'ghost'}
          colorScheme={'yellow'}
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const addToPlaylistHandler = async couseId => {
    await dispatch(addToPlaylist(couseId));
    dispatch(loadUser());
  };

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message]);

  return (
    <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
      <Heading children="All Courses" m={'8'} />

      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type={'text'}
        focusBorderColor="yellow.500"
      />

      <HStack
        overflowX={'auto'}
        paddingY="8"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {categories.map((item, index) => (
          <Button key={index} onClick={() => setCategory(item)} minW={'60'}>
            <Text children={item} />
          </Button>
        ))}
      </HStack>

      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses.map(item => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <Heading mt="4" children="Courses Not Found" />
        )}
      </Stack>
    </Container>
  );
};

export default Courses;

