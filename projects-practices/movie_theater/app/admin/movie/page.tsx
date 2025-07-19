"use client";

import MovieForm from "./components/MovieForm1";
import MovieTable from "./components/TableMovie1";
import {
  Actor,
  createMovie,
  deleteSoftMovie,
  Genre,
  getAllMovies,
  MovieTableRow,
  updateMovie,
  UpdateMovieDto,
  Version,
} from "./services/movieService";
import { handleApiError } from "@/app/utils/errorHandler";
import { useEffect, useState } from "react";
import MovieDetailModal from "./components/MovieDetailModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Toast from "@/components/ui/toast";

interface ToastState {
  message: string;
  type: "success" | "error" | "warning" | "info";
  isVisible: boolean;
}

export default function MoviePage() {
  const [movies, setMovies] = useState<UpdateMovieDto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<MovieTableRow[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editMovie, setEditMovie] = useState<UpdateMovieDto | null>(null);
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "info",
    isVisible: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieTableRow | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);
  

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info" = "info"
  ) => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const data = await getAllMovies() as MovieTableRow[];
      const mapped: MovieTableRow[] = data
        .filter((movie: MovieTableRow) => !movie.is_deleted)
        .map((movie: MovieTableRow) => ({
          ...movie,
          actors: (movie.actors || []).map((a: Actor) => ({ id: a.id, name: a.name })),
          gernes: (movie.gernes || []).map((g: Genre) => ({ id: g.id, genre_name: g.genre_name })),
          versions: (movie.versions || []).map((v: Version) => ({ id: v.id, name: v.name })),
        }));
      setMovies(mapped);
      setFilteredMovies(mapped);
    } catch (error) {
      const errorMessage = handleApiError(error);
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = movies.filter((movie) =>
      movie.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  const
    handleAddNew = () => {
      setIsCreateOpen(true);
    };
  const mockMovie: UpdateMovieDto = {
    name: "ut lan",
    content: "khong biet",
    director: "nhat",
    duration: 120,
    gernes: [] as number[],
    actors: [] as number[],
    versions: [] as number[],
    nation: "viet nam",
    from_date: "2025-01-01",
    to_date: "2025-01-01",
    trailer: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    limited_age: "16+",
    production_company: "company",
    thumbnail: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    banner: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
  };
  // Nếu kiểu dữ liệu BE trả về những gì thì phải trả về đúng giá trij đã map . ví dụ: actor , 
  // ver, gerne chỉ trả về id vs name thì map 2 cái đó thành id vs name
  const handleEditMovie = (movie: UpdateMovieDto) => {
    const formData: UpdateMovieDto = {
      ...movie,
      actors: Array.isArray(movie.actors) ? movie.actors.map(a => typeof a === 'object' ? a.id : a) : [],
      gernes: Array.isArray(movie.gernes) ? movie.gernes.map(g => typeof g === 'object' ? g.id : g) : [],
      versions: Array.isArray(movie.versions) ? movie.versions.map(v => typeof v === 'object' ? v.id : v) : [],
    };
    setEditMovie(formData);
    setIsEditOpen(true);
  };

  const handleDeleteMovie = async (data: MovieTableRow) => {
    if (window.confirm(`Ban co chac muon xoa phim  "${data.name}" ?`)) {
      try {
        setIsLoading(true);
        await deleteSoftMovie(data.id);
        showToast("Xoa phim thanh cong!", "success");
        setMovies(prev => prev.filter(movie => movie.id !== data.id));
        setFilteredMovies(prev => prev.filter(movie => movie.id !== data.id));

      } catch (error) {
        showToast(handleApiError(error), "error");

      } finally {
        setIsLoading(false);
      }

    }
  }

  const handleCreateMovie = async (data: UpdateMovieDto) => {
    try {
      setIsLoading(true);
      // Chỉ gửi đúng trường BE yêu cầu
      const {
        actors,
        gernes,
        versions,

        // loại bỏ các trường này
        ...rest
      } = data;
      const transformedData = {
        ...rest,
        id_Actor: actors,
        id_Gerne: gernes,
        id_Version: versions,

      };

      await createMovie(transformedData);
      showToast("Thêm phim mới thành công!", "success");
      await fetchMovies();
      setIsCreateOpen(false);
    } catch (error) {
      showToast(handleApiError(error), "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateMovie = async (data: UpdateMovieDto) => {
    try {
      setIsLoading(true);
      const {
        actors,
        gernes,
        versions,
        id, // loại bỏ các trường này
        ...rest
      } = data;
      const transformedData: UpdateMovieDto = {
        ...rest,

        id_Actor: actors,
        id_Gerne: gernes,
        id_Version: versions,

      };

      if (editMovie && editMovie.id) {
        await updateMovie(editMovie.id, transformedData);
        showToast("Cập nhật phim thành công!", "success");
        await fetchMovies();
        setIsEditOpen(false);
        setEditMovie(null);
      }
    } catch (error) {
      showToast(handleApiError(error), "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("trang web load lại", searchQuery);
  }, [searchQuery]);

  // Hàm mở modal chi tiết
  const handleShowDetail = (movie: MovieTableRow) => {
    setSelectedMovie(movie);
    setIsDetailOpen(true);
  };

  return (
    <>
      {/* Header riêng cho movie */}
      <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-[#23232a] bg-white dark:bg-[#18181b] w-full">
        <h1 className="text-3xl font-bold text-black dark:text-white">Movies</h1>
        <div className="flex items-center gap-4">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            className="max-w-xs"
          />
          <Button onClick={handleAddNew}>
            + New movie
          </Button>
        </div>
      </div>
      {/* Nội dung chính */}
      <section className="flex-1 overflow-y-auto p-8">
        <MovieTable
          movies={filteredMovies}
          onEdit={handleEditMovie}
          onDelete={handleDeleteMovie}
          onShowDetail={handleShowDetail}
        />
        <MovieForm
          open={isCreateOpen || isEditOpen}
          defaultValues={editMovie || mockMovie}
          onSubmit={isEditOpen ? handleUpdateMovie : handleCreateMovie}
          onClose={() => {
            setIsCreateOpen(false);
            setIsEditOpen(false);
            setEditMovie(null);
          }}
          isLoading={isLoading}
        />
        <MovieDetailModal
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          movie={selectedMovie}
        />
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </section>
    </>
  );
}
