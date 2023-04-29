// // import react from 'react'
// // import { Line } from 'rc-progress'

// // export default function ProgressBar({ progress }) {
// //     return (
// //         <div>
// //             <Line percent={progress}
// //             strokeWidth="3"
// //             strokeColor="#BF00FF"
// //             strokeLinecap="square"
// //             trailWidth="3"
// //             trailColor="#f3f3f3" />
// //         </div>
// //     )
// // }

// import { useState, useEffect } from 'react';
// import { Line } from 'rc-progress';
// import axios from 'axios'

// export default function ProgressBar({ token }) {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         axios.get(`import { useState, useEffect } from 'react';
//         import { Line } from 'rc-progress';
//         import axios from 'axios'
        
//         export default function ProgressBar({ token, animalName, variationType }) {
//             const [data, setData] = useState(null);
        
//             useEffect(() => {
//                 axios.get(`https://is-it-raining.herokuapp.com/my-animals?name=${animalName}&variation_type=${variationType}`, {
//                     headers: {
//                         'Authorization': `Token ${token}`
//                     }
//                 }).then((response) => {
//                     setData(response.data);
//                 })
//             }, [animalName, variationType, token]);
        
//             if (!data) {
//                 return null;
//             }
        
//             const { animal, points } = data;
            // const percentage = Math.round((points / animal.points_left_until_max) * 100);
        
//             return (
//                 <div>
//                     {animal.can_capture ? (
//                         <>
//                             <Line 
//                             percent={percentage} 
//                             strokeWidth="4" 
//                             strokeColor="#2db7f5" 
//                             strokeLinecap="square" 
//                             trailWidth="4" 
//                             trailColor="#f3f3f3" 
//                             />
//                             <p>{percentage}% points collected for {animal.name}</p>
//                         </>
//                 ) : (
//                     <p>{animal.name} cannot be captured</p>
//                 )}
//                 </div>
//             );
//         };
//         `, {
//             headers: {
//                 'Authorization': `Token ${token}`
//             }
//         }).then((response) => {
//             setData(response.data);
//         })
//     }, [token]);

//     const { animal, points } = data;
//     const percentage = Math.round((points / animal.points_left_until_max) * 100);

//     return (
//         <div>
//             {animal.can_capture ? (
//                 <>
//                     <Line 
//                     percent={percentage} 
//                     strokeWidth="4" 
//                     strokeColor="#2db7f5" 
//                     strokeLinecap="square" 
//                     trailWidth="4" 
//                     trailColor="#f3f3f3" 
//                     />
//                     <p>{percentage}% points collected for {animal.name}</p>
//                 </>
//         ) : (
//             <p>{animal.name} cannot be captured</p>
//         )}
//         </div>
//     );
// };
