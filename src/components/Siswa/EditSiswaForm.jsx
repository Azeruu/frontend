import { useForm } from 'react-hook-form';
import './EditSiswa.css'
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {EditUserTextNumber} from './DaftarInputUserTextNumber';
import { URL_HOST } from '../../lib/helper';

export default function Daftar() {
  const { handleSubmit, register, formState:{errors}, setValue} = useForm();
  const [step, setStep] = useState(1);
  const [ jalur, setJalur] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    // Fungsi untuk mengambil data siswa yang sudah ada
    const fetchData = async () => {
      try {
      const response = await axios.get(`${URL_HOST}/data_siswa/${id}`);
        setValue('nama_jalur', response.data.nama_jalur);
        setValue('NISN', response.data.NISN);
        setValue('nama_lengkap', response.data.nama_lengkap);
        setValue('jenis_kelamin', response.data.jenis_kelamin);
        setValue('NIK', response.data.NIK);
        setValue('tempat_lahir', response.data.tempat_lahir);
        setValue('tgl_lahir', response.data.tgl_lahir);
        setValue('usia', response.data.usia);
        setValue('asal_sekolah', response.data.asal_sekolah);
        setValue('nama_jalan', response.data.nama_jalan);
        setValue('no_rumah', response.data.no_rumah);
        setValue('RT', response.data.RT);
        setValue('RW', response.data.RW);
        setValue('Desa', response.data.Desa);
        setValue('Kecamatan', response.data.Kecamatan);
        setValue('jarak', response.data.jarak);
      } catch (e) {
        console.log("error dalam mengambil data siswa:", e);
      }
    };
    fetchData();
}, []);

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(`${URL_HOST}/data_siswa/${id}`, data);
      // console.log("Data Berhasil Di Input", response.data);
      await axios.patch(`${URL_HOST}/rekap_nilai/${id}`, data)
      await axios.patch(`${URL_HOST}/hasil/${id}`, data)
      alert("Data Siswa Berhasil Di Ubah")
      navigate("/siswalist");
    } catch (e) {
      console.log("error dalam submit data :", e);
      alert(e.response.msg);
    }
  };

useEffect(() => {
  const getJalur = async(data) =>{
      const response = await axios.get(`${URL_HOST}/jalur`, data);
      setJalur(response.data);
  }
    getJalur();
}, []);

  const nextStep = () =>{
    setStep(step + 1);
  }
  const prevStep = () =>{
    setStep(step - 1);
  }

  return (
    <div className="Daftar-container">
      <div className="daftar-navbar">
        <h2 className="daftar-judul">Edit Data Pendaftar</h2>
        <div className='daftar-step'>
          <div className="step">
            <button className={`daftar-indicator ${step === 1 ?'daftar-indicator-active':''}`} onClick={()=>setStep(step - 1)}>1</button>
            <p>Data Diri</p>
          </div>
          <div className="step">
          {/* <p className={`indicator-line ${step === 2 ?'indicator-line-active':''}`}></p> */}
              <p className={`daftar-indicator ${step === 2 ?'daftar-indicator-active':''}`}>2</p>
            <p>Alamat </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Langkah Pertama */}
        {step === 1 && (
          <div className='daftar-form'>
            <h2 className="daftar-judul-form">Form 1 : Data Diri</h2>

            <div className='daftar-input-box'>
              <label className="daftar-label">Jalur Pendaftaran</label>
              <select className='daftar-input'{...register("nama_jalur", {required:true})}>
                {jalur.map((path) => (
                  <option key={path.id}>
                    {path.nama_jalur}
                  </option>
                ))}
              </select>
            </div>

              {<EditUserTextNumber errors={errors} register={register} regist_msg="NISN" label_msg="NISN" input_type="number"/>}
              {<EditUserTextNumber errors={errors} register={register} regist_msg="nama_lengkap" label_msg="Nama Lengkap" input_type="text" />}

            <div className='daftar-input-box'>
              <label className="daftar-label">Jenis Kelamin</label>
              <select {...register("jenis_kelamin", {required:true})} >
                <option value="Laki - Laki"> Laki - Laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

              {<EditUserTextNumber errors={errors} register={register} regist_msg="NIK" label_msg="NIK" input_type="number" />}
              {<EditUserTextNumber errors={errors} register={register} regist_msg="tempat_lahir" label_msg="Tempat Lahir"input="text" />}
              {<EditUserTextNumber errors={errors} register={register} regist_msg="tgl_lahir" label_msg="Tanggal Lahir" input_type="date" />}
              {<EditUserTextNumber errors={errors} register={register} regist_msg="usia" label_msg="Usia" input_type="number" />}
              {<EditUserTextNumber errors={errors} register={register} regist_msg="asal_sekolah" label_msg="Asal Sekolah" input_type="text" />}

          </div>
        )}
        {/* Langkah Ke Dua */}
        {step === 2 && (
          <div className='daftar-form'>
            <h2 className="daftar-judul-form">Form 2 : Alamat </h2>
            {<EditUserTextNumber errors={errors} register={register} regist_msg="nama_jalan" label_msg="Nama Jalan" input_type="text" />}
            {<EditUserTextNumber errors={errors} register={register} regist_msg="no_rumah" label_msg="Nomor Rumah" input_type="text" />}
            {<EditUserTextNumber errors={errors} register={register} regist_msg="RT" label_msg="RT"input_type="text" />}
            {<EditUserTextNumber errors={errors} register={register} regist_msg="RW" label_msg="RW"input_type="text" />}
            {<EditUserTextNumber errors={errors} register={register} regist_msg="Desa" label_msg="Desa " input_type="text" />}
            {<EditUserTextNumber errors={errors} register={register} regist_msg="Kecamatan" label_msg="Kecamatan " input_type="text" />}
            {<EditUserTextNumber errors={errors} register={register} regist_msg="jarak" label_msg="Jarak " input_type="text" />}
          </div>
        )}
        <div>
          {step > 1 && (
            <button type="button" className="btnNextPrev"onClick={prevStep}>Kembali</button>
          )}
          {step < 2 && (
            <button type="button" className="btnNextPrev"onClick={nextStep}>Selanjutnya</button>
          )}
          {step === 2 && <button type="submit" className="btnNextPrev">Simpan</button>}
        </div>
      </form>
      </div>
  );
}

