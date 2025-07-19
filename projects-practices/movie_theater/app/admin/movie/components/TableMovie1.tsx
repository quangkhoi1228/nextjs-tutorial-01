import { MovieTableRow, UpdateMovieDto } from "../services/movieService";
import { Button } from "@/components/ui/button";

interface TableMovieProps {
  movies: MovieTableRow[];
  onEdit: (movie: MovieTableRow) => void;
  onDelete: (movie: MovieTableRow) => void;
  onShowDetail?: (movie: MovieTableRow) => void;
}

export default function TableMovie({ movies, onEdit, onShowDetail, onDelete }: TableMovieProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
     gap-6 p-4 bg-gray-100 dark:bg-[#18181b] min-h-screen">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-gray-50 dark:bg-[#23232a] rounded-xl shadow-lg overflow-hidden flex flex-col border border-gray-200 dark:border-[#23232a] hover:border-cyan-400 transition group"
          onClick={() => onShowDetail && onShowDetail(movie)}
          style={{ cursor: onShowDetail ? "pointer" : "default" }}
        >
          <div className="relative">
            <img
              src={movie.thumbnail}
              alt={movie.name}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3 flex gap-2 z-10">
              <Button
                variant="outline"
                size="sm"
                className="border-cyan-400 text-cyan-700 dark:text-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900"
                title="Sửa phim"
                onClick={e => { e.stopPropagation(); onEdit(movie); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6" /></svg>
                Sửa
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="border-red-400 text-red-100 dark:text-red-200 hover:bg-red-400 dark:hover:bg-red-200"
                title="Xóa phim"
                onClick={e => { e.stopPropagation(); onDelete(movie); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                Xóa
              </Button>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 truncate" title={movie.name}>{movie.name}</h3>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-2">Đạo diễn: <span className="text-gray-800 dark:text-white">{movie.director}</span></div>
            <div className="flex flex-wrap gap-2 mb-2">
              {movie.gernes.map((genre) => (
                <span key={genre.id} className="bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100 px-2 py-0.5 rounded-full text-xs">{genre.genre_name}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {movie.versions.map((version) => (
                <span key={version.id} className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-2 py-0.5 rounded-full text-xs">{version.name}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {movie.actors.map((actor) => (
                <span key={actor.id} className="bg-cyan-100 dark:bg-cyan-800 text-cyan-800 dark:text-cyan-100 px-2 py-0.5 rounded-full text-xs">{actor.name}</span>
              ))}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Ngày chiếu: <span className="text-gray-800 dark:text-white">{movie.from_date}</span></div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Đến ngày: <span className="text-gray-800 dark:text-white">{movie.to_date}</span></div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Thời lượng: <span className="text-gray-800 dark:text-white">{movie.duration} phút</span></div>
            <div className="text-gray-500 dark:text-gray-400 text-xs mb-1">Trạng thái: <span className={movie.is_deleted ? 'text-red-400' : 'text-green-600 dark:text-green-400'}>{movie.is_deleted ? 'Đã xóa' : 'Công khai'}</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}