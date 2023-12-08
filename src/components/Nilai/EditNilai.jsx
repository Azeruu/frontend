import { useForm } from 'react-hook-form';
// import '../Siswa/AddSiswa.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { URL_HOST } from '../../lib/helper';
import { EditInputNilaiMapel } from './DaftarInputNilaiMapel';

export default function EditDaftar() {
    const { handleSubmit, register, formState: { errors }, setValue } = useForm();
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        // Fungsi untuk mengambil data nilai yang sudah ada
    const fetchData = async () => {
        try {
        const response = await axios.get(`${URL_HOST}/data_nilai/${id}`);
        setValue('pkn1', response.data.pkn1);
        setValue('pkn2', response.data.pkn1);
        setValue('pkn3', response.data.pkn1);
        setValue('pkn4', response.data.pkn1);
        setValue('pkn5', response.data.pkn1);
        setValue('bindo1', response.data.bindo1);
        setValue('bindo2', response.data.bindo2);
        setValue('bindo3', response.data.bindo3);
        setValue('bindo4', response.data.bindo4);
        setValue('bindo5', response.data.bindo5);
        setValue('mtk1', response.data.mtk1);
        setValue('mtk2', response.data.mtk2);
        setValue('mtk3', response.data.mtk3);
        setValue('mtk4', response.data.mtk4);
        setValue('mtk5', response.data.mtk5);
        setValue('ips1', response.data.ips1);
        setValue('ips2', response.data.ips2);
        setValue('ips3', response.data.ips3);
        setValue('ips4', response.data.ips4);
        setValue('ips5', response.data.ips5);
        setValue('ipa1', response.data.ipa1);
        setValue('ipa2', response.data.ipa2);
        setValue('ipa3', response.data.ipa3);
        setValue('ipa4', response.data.ipa4);
        setValue('ipa5', response.data.ipa5);
        } catch (e) {
        console.log("error dalam mengambil data nilai:", e);
        }
    };
        fetchData();
    }, [setValue]);

    const onSubmit = async (data) => {
        try {
        // Proses pengiriman data nilai yang diubah
        await axios.patch(`${URL_HOST}/data_nilai/${id}`, data);
        await axios.patch(`${URL_HOST}/rekap_nilai/${id}`, data)
        await axios.patch(`${URL_HOST}/hasil/${id}`, data) // Ganti URL sesuai dengan endpoint yang sesuai
        alert("Data Nilai Berhasil Diubah");
        navigate("/nilailist");
        } catch (e) {
        console.log("error dalam submit data:", e);
        alert(e.response.data.msg);
        }
    };

    const nextStep = () => {
        setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }

    return (
        <div className="Daftar-container">
        <div className="daftar-navbar">
            <h2 className="daftar-judul">Edit Data Nilai</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Tampilkan nilai yang sudah ada berdasarkan mata pelajaran yang ingin diedit */}
            {step === 1 && (
            <div className='daftar-form'>
                <h2 className="daftar-judul-form">Nilai Rapor Semester 7 (Kelas 4 semester ganjil)</h2>
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="pkn1" label_msg="Bidang Studi PKN" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="bindo1" label_msg="Bidang Studi B.INDO" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="mtk1" label_msg="Bidang Studi MTK" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ips1" label_msg="Bidang Studi IPS" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ipa1" label_msg="Bidang Studi IPA" input_type="text" />}
            </div>
            )}
            {step === 2 && (
            <div className='daftar-form'>
                <h2 className="daftar-judul-form">Nilai Rapor Semester 8 (Kelas 4 semester genap)</h2>
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="pkn2" label_msg="Bidang Studi PKN" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="bindo2" label_msg="Bidang Studi B.INDO" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="mtk2" label_msg="Bidang Studi MTK" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ips2" label_msg="Bidang Studi IPS" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ipa2" label_msg="Bidang Studi IPA" input_type="text" />}
            </div>
            )}
            {step === 3 && (
            <div className='daftar-form'>
                <h2 className="daftar-judul-form">Nilai Rapor Semester 9 (Kelas 5 semester ganjil)</h2>
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="pkn3" label_msg="Bidang Studi PKN" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="bindo3" label_msg="Bidang Studi B.INDO" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="mtk3" label_msg="Bidang Studi MTK" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ips3" label_msg="Bidang Studi IPS" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ipa3" label_msg="Bidang Studi IPA" input_type="text" />}
            </div>
            )}
            {step === 4 && (
            <div className='daftar-form'>
                <h2 className="daftar-judul-form">Nilai Rapor Semester 10 (Kelas 5 semester genap)</h2>
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="pkn4" label_msg="Bidang Studi PKN" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="bindo4" label_msg="Bidang Studi B.INDO" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="mtk4" label_msg="Bidang Studi MTK" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ips4" label_msg="Bidang Studi IPS" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ipa4" label_msg="Bidang Studi IPA" input_type="text" />}
            </div>
            )}
            {step === 5 && (
            <div className='daftar-form'>
                <h2 className="daftar-judul-form">Nilai Rapor Semester 11 (Kelas 6 semester ganjil)</h2>
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="pkn5" label_msg="Bidang Studi PKN" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="bindo5" label_msg="Bidang Studi B.INDO" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="mtk5" label_msg="Bidang Studi MTK" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ips5" label_msg="Bidang Studi IPS" input_type="text" />}
                {<EditInputNilaiMapel errors={errors} register={register} regist_nilai="ipa5" label_msg="Bidang Studi IPA" input_type="text" />}
            </div>
            )}
            {/* ... Sisakan langkah-langkah berikutnya hingga selesai */}
            <div>
            {step > 1 && (
                <button type="button" className="btnNextPrev" onClick={prevStep}>Kembali</button>
            )}
            {step < 5 && (
                <button type="button" className="btnNextPrev" onClick={nextStep}>Selanjutnya</button>
            )}
            {step === 5 && <button type="submit" className="btnNextPrev">Submit</button>}
            </div>
        </form>
        </div>
    );
}
