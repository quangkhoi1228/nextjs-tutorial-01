'use client'

import { useEffect } from "react";
import { Actor } from "../services/actorService";
import { useForm } from 'react-hook-form';
import Modal from "../../movie/components/Modal";
import InputField from "../../movie/components/form/InputField";



interface ActorFormProps {
    open: boolean;
    onSubmit: (data: any) => void;
    onClose: () => void;
    defaultValues?: Partial<Actor>;
    isLoading?: boolean;
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
        <Modal open={open} onClose={onClose}>
            <h2 className="text-2xl font-bold mb-6 text-center">Thêm / Sửa diễn viên</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 max-h-[70vh] overflow-y-auto p-4 bg-white rounded-lg shadow-lg"
            >
                <InputField
                    label="Tên diễn viên"
                    name="name"
                    register={register}
                    type="text"
                    required
                    placeholder="Nhập tên diễn viên"
                    className="mb-2"
                />
                <InputField
                    label="Tên nghệ danh"
                    name="stage_name"
                    register={register}
                    type="text"
                    placeholder="Nhập tên nghệ danh"
                    className="mb-2"
                />
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
                <InputField
                    label="Ngày sinh"
                    name="date_of_birth"
                    register={register}
                    type="date"
                    className="mb-2"
                />
                <InputField
                    label="Quốc tịch"
                    name="nationality"
                    register={register}
                    type="text"
                    placeholder="Nhập quốc tịch"
                    className="mb-2"
                />
                <InputField
                    label="Tiểu sử"
                    name="biography"
                    register={register}
                    type="text"
                    placeholder="Nhập tiểu sử"
                    className="mb-2"
                />
                <InputField
                    label="Ảnh đại diện"
                    name="profile_image"
                    register={register}
                    type="text"
                    placeholder="Link ảnh đại diện"
                    className="mb-2"
                />
                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? "Đang xử lý..." : "Lưu"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}