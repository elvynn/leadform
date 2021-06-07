import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import InputMask from "react-input-mask";


import styles from "./Form.module.css";

const perfectures = ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県',];

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
      //Send data to server

      //on ok callback Send email
      axios.post(`http://localhost:8888/leadform/public/mailform/mailform.php`, data)
      .then(res => {
        if(res.data){
          console.log(res.data);
          //change to thanks page, remove loading state
        }else{
          console.log("error");
          //Error feedback
        }
      })
    };
    
  
    return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <div className={ !errors.name ? styles.formGroup : [styles.formGroup, styles.error].join(' ') }>
        <label htmlFor="name">お名前</label>
        <div>
          <input 
            id="name"
            aria-invalid={errors.name ? "true" : "false"}
            placeholder="name"
            {...register("name", { 
              required: true , 
              pattern: /^(?=.{1,40}$)[a-zA-Z]+(?:[a-zA-Z]+)*$/ 
            })} 
            />
          {errors.name && errors.name.type === "required" && <span role="alert" className={styles.errorMessage}>The name is required</span>}
          {errors.name && errors.name.type === "pattern" && <span role="alert" className={styles.errorMessage}>Your name cannot contain numbers, spaces or special characters</span>}
        </div>
      </div>

      
      {/* Email */}
      <div className={ !errors.email ? styles.formGroup : [styles.formGroup, styles.error].join(' ') }>
        <label htmlFor="email">メール</label>
        <div>
          <input 
            id="email"
            type="email"
            placeholder="name@mail.com"
            {...register("email", { 
              required: true , 
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })} />
          {errors.email && errors.email.type === "required" && <span role="alert" className={styles.errorMessage}>The email is required</span>}
          {errors.email && errors.email.type === "pattern" && <span role="alert" className={styles.errorMessage}></span>}
        </div>
      </div>

      {/* Phone */}
      <div className={ !errors.tel ? styles.formGroup : [styles.formGroup, styles.error].join(' ') }>
        <label htmlFor="tel">携帯番号</label>
        <div>
          <InputMask
            id="tel"
            mask="999-9999-9999" 
            maskPlaceholder="___-____-____"
            placeholder="000-0000-0000"
            {...register("tel", { 
              required: true, 
              maxLength: 13,
              minLength: 8,
            })} />
          {errors.tel && errors.tel.type === "required" && <span role="alert" className={styles.errorMessage}>The phone is required</span>}
          {errors.tel && errors.tel.type === "maxLength" && <span role="alert" className={styles.errorMessage}>The phone is too long</span>}
          {errors.tel && errors.tel.type === "minLength" && <span role="alert" className={styles.errorMessage}>The phone is too short</span>}
        </div>
      </div>

      {/* Birthday */}
      <div className={ !errors.birthday ? styles.formGroup : [styles.formGroup, styles.error].join(' ') }>
        <label htmlFor="birthday">生年月日</label>
        <div>
          <InputMask 
            id="birthday"
            mask="9999/99/99" 
            maskPlaceholder="YYYY/MM/DD" 
            placeholder="YYYY/MM/DD" 
            {...register("birthday", { 
              required: true
            })} />
          {errors.birthday && errors.birthday.type === "required" && <span role="alert" className={styles.errorMessage}>The birthday is required</span>}
        </div>
      </div>

      {/* Perfecture */}
      <div className={ !errors.perfecture ? styles.formGroup : [styles.formGroup, styles.error].join(' ') }>
        <label htmlFor="perfectures">都道府県</label>
        <select id="perfectures" {...register("gender")}>
          { perfectures.map((perfecture, key) => <option key={key} value={perfecture}>{perfecture}</option>) }
        </select>
      </div>

      {/* terms aceptation */}
      <div className={ !errors.aceptation ? styles.formGroup : [styles.formGroup, styles.error].join(' ') }>
        <input 
          id="terms"
          type="checkbox"
          {...register("aceptation", { 
            required: true , 
          })} />
          <label　htmlFor="terms">使用規約同意します。</label>
        {errors.aceptation && errors.aceptation.type === "required" && <span role="alert" className={styles.errorMessage}>You must accept the terms and conditions</span>}
      </div>
      <input className={styles.btn} type="submit" />
    </form>
  );
};




export default Form;