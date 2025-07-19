'use client'

import { useEffect } from "react";
import { Actor } from "../services/actorService";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ActorFormProps {
    open: boolean;
    onSubmit: (data: any) => void;
    onClose: () => void;
    defaultValues?: Partial<Actor>;
    isLoading?: boolean;
    searchValue?: string;
    onSearch?: (query: string) => void;
}

export default function ActorForm({
    open,
    onClose,
    onSubmit,
    defaultValues = {},
    isLoading,
}: ActorFormProps) {
    const { register, handleSubmit, reset } = useForm({ defaultValues });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);
    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogTitle>Thêm / Sửa diễn viên</DialogTitle>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 max-h-[70vh] overflow-y-auto"
                >
                    
                    <div>
                        <label className="block font-medium mb-1">Tên diễn viên</label>
                        <Input
                            {...register('name', { required: true })}
                            type="text"
                            placeholder="Nhập tên diễn viên"
                            className="mb-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Tên nghệ danh</label>
                        <Input
                            {...register('stage_name')}
                            type="text"
                            placeholder="Nhập tên nghệ danh"
                            className="mb-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Giới tính</label>
                        <select
                            {...register("gender")}
                            className="border p-2 w-full rounded focus:outline-blue-400"
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Ngày sinh</label>
                        <Input
                            {...register('date_of_birth')}
                            type="date"
                            className="mb-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Quốc tịch</label>
                        <Input
                            {...register('nationality')}
                            type="text"
                            placeholder="Nhập quốc tịch"
                            className="mb-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Tiểu sử</label>
                        <Input
                            {...register('biography')}
                            type="text"
                            placeholder="Nhập tiểu sử"
                            className="mb-2"
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">Ảnh đại diện</label>
                        <Input
                            {...register('profile_image')}
                            type="text"
                            placeholder="Link ảnh đại diện"
                            className="mb-2"
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? "Đang xử lý..." : "Lưu"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}