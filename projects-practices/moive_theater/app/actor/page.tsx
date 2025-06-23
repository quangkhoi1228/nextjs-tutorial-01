import EntityToolbar from "../components/EntityToolbar";
import TableActor from "./components/TableActor"; // TableActor chỉ render bảng
import { useActorManagement } from "./hooks/UseActor";

export default function ActorPage() {
  const {
    actors,
    loading,
    error,
    handleAddActor,
    handleEditActor,
    searchQuery,
    handleSearch,
    // ...phân trang
  } = useActorManagement();

  // ...phân trang giả lập
  const currentPage = 1;
  const handlePrevious = () => {};
  const handleNext = () => {};

  return (
    <section className="bg-white h-screen text-black overflow-y-auto">
      <EntityToolbar
        title="Quản lý Diễn viên"
        onAdd={handleAddActor}
        searchValue={searchQuery}
        onSearch={handleSearch}
        searchPlaceholder="Tìm kiếm diễn viên..."
        currentPage={currentPage}
        onPreviousPage={handlePrevious}
        onNextPage={handleNext}
      />
      <TableActor
        actors={actors}
        loading={loading}
        error={error}
        onEdit={handleEditActor}
      />
      {/* Thêm ActorModal nếu cần */}
    </section>
  );
}