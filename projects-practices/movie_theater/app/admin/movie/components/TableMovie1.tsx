import Link from "next/link";
import { Movie } from "../services/movieService"


interface TableMovieProps {
    movies: Movie[]
    onEdit: (moive: Movie) => void;
}

// default duoc dung de import khong co  {name}
export default function TableMovie({ movies, onEdit }: TableMovieProps) {
    return (
        <div className="overflow-x-auto rounded-lg shadow bg-white">
            <table className="min-w-full border border-gray-200">
                <thead>
                    <tr className="bg-gray-100 text-gray-700">
                        <th className="py-2 px-4 font-semibold border-b">Tên phim</th>
                        <th className="py-2 px-4 font-semibold border-b">Đạo diễn</th>
                        <th className="py-2 px-4 font-semibold border-b">Thời lượng</th>
                        <th className="py-2 px-4 font-semibold border-b">Từ ngày</th>
                        <th className="py-2 px-4 font-semibold border-b">Đến ngày</th>
                        <th className="py-2 px-4 font-semibold border-b">Thumbnail</th>
                        <th className="py-2 px-4 font-semibold border-b">Banner</th>
                        <th className="py-2 px-4 font-semibold border-b text-center">Thao tác</th>
                        <th className="py-2 px-4 font-semibold border-b text-center">Actor</th>
                        <th className="py-2 px-4 font-semibold border-b text-center">Thể loại</th>
                        <th className="py-2 px-4 font-semibold border-b text-center">Phiên bản</th>
                        <th className="py-2 px-4 font-semibold border-b text-center">Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie.id} className="hover:bg-gray-50 transition">
                            <td className="py-2 px-4 border-b">
                                <a href="#" className="text-blue-600 hover:underline">{movie.name}</a>
                            </td>
                            <td className="py-2 px-4 border-b">{movie.director}</td>
                            <td className="py-2 px-4 border-b">{movie.duration} phút</td>
                            <td className="py-2 px-4 border-b">{movie.from_date}</td>
                            <td className="py-2 px-4 border-b">{movie.to_date}</td>
                            <td className="py-2 px-4 border-b">
                                <img src={movie.thumbnail} alt="thumb" className="w-12 h-12 object-cover rounded shadow mx-auto" />
                            </td>
                            <td className="py-2 px-4 border-b">
                                <img src={movie.banner} alt="banner" className="w-12 h-12 object-cover rounded shadow mx-auto" />
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={() => onEdit(movie)}>Sửa</button>
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {movie.actors.map(actor => (
                                    <span key={actor.id} className="inline-block bg-cyan-400 text-white rounded-full px-2 py-1 text-xs m-1">{actor.name}</span>
                                ))}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {movie.gernes.map(genre => (
                                    <span key={genre.id} className="inline-block bg-green-400 text-white rounded-full px-2 py-1 text-xs m-1">{genre.genre_name}</span>
                                ))}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                {movie.versions.map(version => (
                                    <span key={version.id} className="inline-block bg-blue-200 text-blue-800 rounded-full px-2 py-1 text-xs m-1">{version.name}</span>
                                ))}
                            </td>
                            <td className="py-2 px-4 border-b text-center">
                                <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${movie.is_deleted ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                    {movie.is_deleted ? 'Đã xóa' : 'Công khai'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}