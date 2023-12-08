import { useForm } from 'react-hook-form';
// import '../Siswa/AddSiswa.css';
import React, { useState } from 'react';
import axios from "axios";
import {useNavigate, useParams } from 'react-router-dom';
import {DaftarInputNilaiMapel} from './DaftarInputNilaiMapel';
import { URL_HOST } from '../../lib/helper';

export default function Daftar2() {
  const { handleSubmit, register, formState:{errors}} = useForm();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const {id} =  useParams();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${URL_HOST}/data_nilai`, data);
      const newId = response.data.idSiswaBaru;
      alert("Data Nilai Berhasil Di Input")
      navigate(`/bukti/${newId}`);
      await axios.post(`${URL_HOST}/rekap_nilai`);
      await axios.post(`${URL_HOST}/hasil`);
      console.log(response.data);
  } catch (e) {
    console.log("error dalam submit data:", e);
    alert(e.response.data.msg);
  }
  };

  const nextStep = () =>{
    setStep(step + 1);
  }
  const prevStep = () =>{
    setStep(step - 1);
  }

  return (
    <div className="Daftar-container">
      <div className="daftar-navbar">
        <h2 className="daftar-judul">Formulir Pendaftaran PPDB</h2>
        <div className='daftar-step'>
          <div className="step">
            <p className={`daftar-indicator ${step === 1 ?'daftar-indicator-active':''}`}>1</p>
            <p>Nilai 1</p>
          </div>
          <div className="step">
            <p className={`daftar-indicator ${step === 2 ?'daftar-indicator-active':''}`}>2</p>
            <p>Nilai 2</p>
          </div>
          <div className="step">
            <p className={`daftar-indicator ${step === 3 ?'daftar-indicator-active':''}`}>3</p>
            <p>Nilai 3</p>
          </div>
          <div className="step">
            <p className={`daftar-indicator ${step === 4 ?'daftar-indicator-active':''}`}>4</p>
            <p>Nilai 4</p>
          </div>
          <div className="step">
            <p className={`daftar-indicator ${step === 5 ?'daftar-indicator-active':''}`}>5</p>
            <p>Nilai 5</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className='daftar-input-box'>
        <label className="daftar-label">Siswa ID</label>
          <input type='text' name="nilai" className="daftar-input" {...register('dataSiswaId')} value={id} readOnly />
          {errors&& (
              <span className="daftar-span">wajib diisi</span>
          )}
      </div>
        {/* Langkah Ke Tiga */}
        {step === 1 && (
          <div className='daftar-form'>
            <h1 className="daftar-judul-form">Form 3 : Nilai</h1>
            <h2 className="daftar-judul-form">Nilai Rapor Semester 7 (Kelas 4 semester ganjil)</h2>
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="pkn1" kelas="4" semester="1" mapel="PKN" label_msg="Bidang Studi PKN" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="bindo1" kelas="4" semester="1" mapel="B.Indonesia" label_msg="Bidang Studi B.Indonesia" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="mtk1" kelas="4" semester="1" mapel="Matematika" label_msg="Bidang Studi Matematika" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="ips1" kelas="4" semester="1" mapel="IPS" label_msg="Bidang Studi IPS" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="ipa1" kelas="4" semester="1" mapel="IPA" label_msg="Bidang Studi IPA" input_type="text" />}
          </div>
        )}
        {step === 2 && (
          <div className='daftar-form'>
            <h1 className="daftar-judul-form">Form 3 : Nilai</h1>
            <h2 className="daftar-judul-form">Nilai Rapor Semester 8 (Kelas 4 semester genap)</h2>
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="pkn2" kelas="4" semester="2" mapel="PKN" label_msg="Bidang Studi PKN" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="bindo2" kelas="4" semester="2" mapel="B.Indonesia" label_msg="Bidang Studi B.Indonesia" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="mtk2" kelas="4" semester="2" mapel="Matematika" label_msg="Bidang Studi Matematika" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="ips2" kelas="4" semester="2" mapel="IPS" label_msg="Bidang Studi IPS" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="ipa2" kelas="4" semester="2" mapel="IPA" label_msg="Bidang Studi IPA" input_type="text" />}
          </div>        
          )}
        {step === 3 && (
          <div className='daftar-form'>
            <h1 className="daftar-judul-form">Form 3 : Nilai</h1>
            <h2 className="daftar-judul-form">Nilai Rapor Semester 9 (Kelas 5 semester ganjil)</h2>
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="pkn3" kelas="5" semester="1" mapel="PKN" label_msg="Bidang Studi PKN" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="bindo3" kelas="5" semester="1" mapel="B.Indonesia" label_msg="Bidang Studi B.Indonesia" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="mtk3" kelas="5" semester="1" mapel="Matematika" label_msg="Bidang Studi Matematika" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="ips3" kelas="5" semester="1" mapel="IPS" label_msg="Bidang Studi IPS" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="ipa3" kelas="5" semester="1" mapel="IPA" label_msg="Bidang Studi IPA" input_type="text" />}
          </div>
          )}
        {step === 4 && (
          <div className='daftar-form'>
            <h1 className="daftar-judul-form">Form 3 : Nilai</h1>
            <h2 className="daftar-judul-form">Nilai Rapor Semester 10 (Kelas 5 semester genap)</h2>
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="pkn4" kelas="5" semester="2" mapel="PKN" label_msg="Bidang Studi PKN" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="bindo4" kelas="5" semester="2" mapel="B.Indonesia" label_msg="Bidang Studi B.Indonesia" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="mtk4" kelas="5" semester="2" mapel="Matematika" label_msg="Bidang Studi Matematika" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="ips4" kelas="5" semester="2" mapel="IPS" label_msg="Bidang Studi IPS" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="ipa4" kelas="5" semester="2" mapel="IPA" label_msg="Bidang Studi IPA" input_type="text" />}
          </div>
        )}
        {step === 5 && (
          <div className='daftar-form'>
            <h1 className="daftar-judul-form">Form 3 : Nilai</h1>
            <h2 className="daftar-judul-form">Nilai Rapor Semester 11 (Kelas 6 semester ganjil)</h2>
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="pkn5" kelas="6" semester="1" mapel="PKN" label_msg="Bidang Studi PKN" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="bindo5" kelas="6" semester="1" mapel="B.Indonesia" label_msg="Bidang Studi B.Indonesia" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="mtk5" kelas="6" semester="1" mapel="Matematika" label_msg="Bidang Studi Matematika" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="ips5" kelas="6" semester="1" mapel="IPS" label_msg="Bidang Studi IPS" input_type="text" />}
            {<DaftarInputNilaiMapel errors={errors} register={register} regist_nilai="ipa5" kelas="6" semester="1" mapel="IPA" label_msg="Bidang Studi IPA" input_type="text" />}
          </div>
        )}

        <div>
          {step > 1 && (
            <button type="button" className="btnNextPrev"onClick={prevStep}>Kembali</button>
          )}
          {step < 5 && (
            <button type="button" className="btnNextPrev"onClick={nextStep}>Selanjutnya</button>
          )}
          {step === 5 && <button type="submit" className="btnNextPrev">Submit</button> }
        </div>
      </form>
      </div>
  );
}

