// import Link from 'next/link';
// import { Movie } from '../services/movieService';

// interface TableMovieProps {
//   movies: Movie[];
//   onEdit?: (movie: Movie) => void;
// }

// export default function TableMovie({ movies, onEdit }: TableMovieProps) {
//   return (
//     <table className="w-full border text-left">
//       <thead>
//         <tr>
//           <th className="border px-4 py-2">Tên phim</th>
//           <th className="border px-4 py-2">Đạo diễn</th>
//           <th className="border px-4 py-2">Thời lượng</th>
//           <th className="border px-4 py-2">Từ ngày</th>
//           <th className="border px-4 py-2">Đến ngày</th>
//           <th className="border px-4 py-2">Thể loại</th>
//           <th className="border px-4 py-2">Trạng thái</th>
//           <th className="border px-4 py-2">Thao tác</th>
//         </tr>
//       </thead>
//       <tbody>
//         {movies.map((movie) => (
//           <tr key={movie.id}>
//             <td className="border px-4 py-2 text-blue-600 underline cursor-pointer">
//               <Link href={`#`}>{movie.name}</Link>
//             </td>
//             <td className="border px-4 py-2">{movie.director}</td>
//             <td className="border px-4 py-2">{movie.duration} phút</td>
//             <td className="border px-4 py-2">{movie.from_date}</td>
//             <td className="border px-4 py-2">{movie.to_date}</td>
//             <td className="border px-4 py-2">
//               {movie.gernes?.map((g) => (
//                 <span key={g.id} className="bg-cyan-500 text-white 
// text-xs px-2 py-1 rounded mr-1 inline-block mb-1">{g.genre_name}</span>
//               ))}
//             </td>
//             <td className="border px-4 py-2">
//               <span className={`text-xs px-2 py-1 rounded font-semibold ${!movie.is_deleted ? 
// 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
//                 {!movie.is_deleted ? 'Công khai' : 'Đã xóa'}
//               </span>
//             </td>
//             <td className="border px-4 py-2">
//               <button className="text-blue-500 underline mr-2" onClick={() => onEdit && onEdit(movie)}>Sửa</button>
//               <button className="text-red-500 underline">Xóa</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }