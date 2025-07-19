'use client'
import { useActorManagement } from "./hooks/UseActor"
import TableActor from "./components/TableActor";
import ActorForm from './components/ActorForm';
import { Actor, ActorService } from "./services/actorService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ActorDetailModal from "./components/ActorDetailModal";

export default function ActorPage() {
    const {
        actors,
        loading,
        error,
        selectedActor,
        isModalOpen,
        searchQuery,
        isDetailOpen,
        isCreateOpen,
        filteredActor,
        handleAddActor,
        handleDeleteActor,
        handleSearch,
        closeModal,
        fetchActors,
        setIsDetailOpen,
        searchActorForm,
        handleSearchActorForm,
        handleEditActor,
        handleShowDetail,
    } = useActorManagement();

    const getCleanActor = (actor: Actor) => {
        const { id, created_at,updated_at, is_deleted, ...rest } = actor || {};
        return rest;
    };

    const handleSubmitActor = async (data: Actor) => {
        try {
            // Xóa các trường không hợp lệ
            const { id,created_at,updated_at,  is_deleted, ...cleanData } = data;

            if (selectedActor && selectedActor.id) {
                await ActorService.update(selectedActor.id, cleanData);
            } else {
                await ActorService.create(cleanData);
            }
            await fetchActors();
            closeModal();
        } catch (error: any) {
            console.error(error);
        }
    };


    return (
        <div className="min-h-screen flex bg-white dark:bg-[#18181b]">
            {/* Sidebar */}

            <main className="flex-1 flex flex-col">
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-[#23232a] bg-white dark:bg-[#18181b] w-full">
                    <h1 className="text-3xl font-bold text-black dark:text-white">Actors</h1>
                    <div className="flex items-center gap-4">
                        <Input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={e => handleSearch(e.target.value)}
                            className="max-w-xs"
                        />
                        <Button onClick={handleAddActor}>
                            + New Actor
                        </Button>
                    </div>
                </div>
                <section className="flex-1 overflow-y-auto p-4">
                    <TableActor
                        actors={filteredActor.length > 0 || searchQuery ? filteredActor : actors}
                        loading={loading}
                        error={error}
                        onEdit={handleEditActor}
                        searchValue={searchQuery}
                        onSearch={handleSearch}
                        onDelete={handleDeleteActor}
                        onShowDetail={handleShowDetail}
                    />
                    <ActorDetailModal
                        isOpen={isDetailOpen}
                        onClose={() => setIsDetailOpen(false)}
                        actor={selectedActor}
                    />
                    <ActorForm
                        open={isModalOpen || isCreateOpen}
                        onSubmit={handleSubmitActor}
                        defaultValues={getCleanActor(selectedActor)}
                        isLoading={loading}
                        onClose={closeModal}
                        searchValue={searchActorForm}
                        onSearch={handleSearchActorForm}
                    />
                </section>
            </main>
        </div>
    )
}