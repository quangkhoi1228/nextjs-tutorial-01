'use client'

import UtilityContainer from "@/app/components/UtilityContainer";
import { useActorManagement } from "./hooks/UseActor"
import AddnewButton from "@/app/components/AddnewButton";
import SearchInput from "@/app/components/SearchInput";
import { Table } from "lucide-react";
import TableActor from "./components/TableActor";
import ActorForm from './components/ActorForm';
import { ActorService } from "./services/actorService";


export default function ActorPage(){
    const{
        actors,
        loading,
        error,
        selectedActor,
        isModalOpen,
        searchQuery,
        
        handleAddActor,
        handleEditActor,
        handleSearch,
        closeModal,
        fetchActors,
       
    } = useActorManagement();

    const handleSubmitActor = async (data: any) => {
        try {
          // Nếu selectedActor có id thì là update, không thì là create
          if (selectedActor && selectedActor.id) {
            await ActorService.update(selectedActor.id, data);
            // showToast('Cập nhật diễn viên thành công!', 'success');
          } else {
            await ActorService.create(data);
            // showToast('Thêm diễn viên thành công!', 'success');
          }
          await fetchActors();
          closeModal();
        } catch (error: any) {
          // showToast(error.message || 'Có lỗi xảy ra', 'error');
          console.error(error);
        }
      };

    return(
        <section className="p-4">
            <h2 className="text-xl font-bold mb-4 text-center" >Quan ly dien vien</h2>
            <UtilityContainer>
                <AddnewButton onClick={handleAddActor}/>
                <SearchInput value={searchQuery} onChange={handleSearch} placeholder="Tim kiem dien vien..." />

                </UtilityContainer>
                <TableActor
                actors={actors}
                loading={loading}
                error={error}
                onEdit={handleEditActor}
                searchValue={searchQuery}
                onSearch={handleSearch}
                currentPage={1}
                onPreviousPage={()=>{}}
                onNextPage={()=>{}}
                totalPages={1}

                
                />
                <ActorForm
                    open={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleSubmitActor}
                    defaultValues={selectedActor || {}}
                    isLoading={loading}
                    
                />
        </section>
    )
}