import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '../FormField';
import Button from '../Button';
import { validationSchema, statusOptions } from '../../utils/validation';
import styles from './JobApplicationForm.module.css';

const JobApplicationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur'
  });

  const watchedValues = watch();

  const onSubmit = async (data) => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // シミュレーション: 実際のAPIコール
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('提出されたデータ:', data);
      
      setIsSubmitted(true);
      setShowConfirmation(false);
    } catch (error) {
      console.error('送信エラー:', error);
      alert('送信中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmationCancel = () => {
    setShowConfirmation(false);
  };

  if (isSubmitted) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>応募を受け付けました</h2>
        <p className={styles.successMessage}>
          ご応募いただきありがとうございます。<br />
          担当者より追って連絡いたします。
        </p>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className={styles.confirmationContainer}>
        <h2 className={styles.confirmationTitle}>入力内容をご確認ください</h2>
        
        <div className={styles.confirmationContent}>
          <div className={styles.confirmationItem}>
            <strong>氏名:</strong> {watchedValues.name}
          </div>
          <div className={styles.confirmationItem}>
            <strong>住所:</strong> {watchedValues.address}
          </div>
          <div className={styles.confirmationItem}>
            <strong>開始時期:</strong>{' '}
            {statusOptions.find(option => option.value === watchedValues.status)?.label}
          </div>
          <div className={styles.confirmationItem}>
            <strong>志望動機:</strong>
            <div className={styles.motivationText}>
              {watchedValues.motivation}
            </div>
          </div>
        </div>

        <div className={styles.confirmationButtons}>
          <Button 
            variant="secondary" 
            onClick={handleConfirmationCancel}
            disabled={isSubmitting}
          >
            修正する
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? '送信中...' : '送信する'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormField
          name="name"
          label="氏名"
          placeholder="山田 太郎"
          required
          register={register}
          error={errors.name}
          maxLength={50}
        />

        <FormField
          name="address"
          label="住所"
          type="textarea"
          placeholder="東京都渋谷区〇〇1-2-3"
          required
          register={register}
          error={errors.address}
          maxLength={200}
          rows={3}
        />

        <FormField
          name="status"
          label="開始時期"
          type="radio"
          required
          register={register}
          error={errors.status}
          options={statusOptions}
        />

        <FormField
          name="motivation"
          label="志望動機"
          type="textarea"
          placeholder="志望動機をお聞かせください"
          required
          register={register}
          error={errors.motivation}
          maxLength={1000}
          rows={6}
          showCharCount
          value={watchedValues.motivation || ''}
        />

        <div className={styles.submitContainer}>
          <Button 
            type="submit" 
            disabled={!isValid}
          >
            確認画面へ
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;