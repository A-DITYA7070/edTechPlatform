// import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
// import React, { useState } from 'react'
// import introvideo from "../../assests/Videos/intro.mp4"

// const CoursePage = () => {
//     const [lectureNumber,setLectureNumber]=useState(0);
//     const lectures=[
//         {
//         _id:"sananana",
//         title:"java fundamentals",
//         description:"java video 1 (getting started with java fundamentals)",
//         video:{
//             url:"shksksk",   
//         }
//        },
//         {
//             _id:"sanana",
//             title:"classes and methods",
//             description:"java video 1 (getting started with java fundamentals)",
//             video:{
//                 url:"shksksk",   
//             }
//         },
//         {
//             _id:"sana",
//             title:"oops fundamentals",
//             description:"java video 1 (getting started with java fundamentals)",
//             video:{
//                 url:"shksksk",   
//             }
//         }
//     ]
//   return (
//     <Grid
//     my="24"
//     minH={"90vh"}
//     templateColumns={["1fr","3fr 1fr"]}
//     >
//         <Box>
//         <video
//             src={introvideo}
//             controls 
//             controlsList='nodownload'
//             disablePictureInPicture
//             width={"100%"}
//             >
//             </video>
//             <Heading m="4" children={`#${lectureNumber+1} ${lectures[lectureNumber].title}`}/>
//             <Heading children={lectures[lectureNumber].description}
//             m="4"
//             />
//             <Text m="4" children="learn java fundamentals in 30 days"/>
//         </Box>
//         <VStack>
//            {lectures.map((item,index)=>(
//             <button
//             onClick={()=>setLectureNumber(index)}
//             key={index._id}
//             style={{
//                 width:"100%",
//                 margin:0,
//                 textAlign:"center",
//                 padding:"1rem",
//                 borderBottom:"1px solid black"

//             }}
//             >
//                 <Text noOfLines={"1"}>
//                     #{index+1} {item.title}
//                 </Text>
//             </button>
//            ))}
//         </VStack>
//     </Grid>
//   )
// }

// export default CoursePage;

import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from "../layout/loader/Loader.jsx";

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const { lectures, loading } = useSelector(state => state.course);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {lectures && lectures.length > 0 ? (
        <>
          <Box>
            <video
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            ></video>

            <Heading
              m="4"
              children={`#${lectureNumber + 1} ${
                lectures[lectureNumber].title
              }`}
            />

            <Heading m="4" children="Description" />
            <Text m="4" children={lectures[lectureNumber].description} />
          </Box>

          <VStack>
            {lectures.map((element, index) => (
              <button
                onClick={() => setLectureNumber(index)}
                key={element._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
              >
                <Text noOfLines={1}>
                  #{index + 1} {element.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
      ) : (
        <Heading children="No Lectures" />
      )}
    </Grid>
  );
};

export default CoursePage;

