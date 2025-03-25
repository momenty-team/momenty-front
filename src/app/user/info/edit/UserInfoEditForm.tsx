'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
interface UsersInfo {
  id: number;
  name: string;
  nickname: string;
  birth_date: string;
  email: string;
  profile_image_url: string;
  gender: string;
  is_public: boolean;
  follower_count: number;
  following_count: number;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

interface UserInfoEditForm {
  nickname: string;
  birth_date: string;
  gender: string;
  is_public?: boolean;
  profile_image_url?: string;
}

interface UserInfoEditFormProps {
  userInfo: UsersInfo;
}

function UserInfoEditForm({ userInfo }: UserInfoEditFormProps) {
  const route = useRouter();
  const [selectedGender, setSelectedGender] = useState(userInfo.gender);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: userInfo.name,
      nickname: userInfo.nickname,
      birth_date: userInfo.birth_date,
      email: userInfo.email,
      gender: userInfo.gender,
      is_public: userInfo.is_public,
      profile_image_url: userInfo.profile_image_url,
    },
  });
  const formatDate = (input: string) => {
    const sliceNumber = input.replace(/\D/g, '').slice(0, 8);

    if (sliceNumber.length <= 4) return sliceNumber;

    if (sliceNumber.length <= 6) return `${sliceNumber.slice(0, 4)}-${sliceNumber.slice(4)}`;

    return `${sliceNumber.slice(0, 4)}-${sliceNumber.slice(4, 6)}-${sliceNumber.slice(6)}`;
  };

  const checkNicknameDuplicate = async (nickname: string) => {
    try {
      const response = await fetch(`/api/users/nickname/check?nickname=${nickname}`);

      if (!response.ok) throw new Error('닉네임 중복 확인 실패');

      return true;
    } catch (err) {
      alert('닉네임 확인 중 오류가 발생했습니다.' + err);
      return false;
    }
  };

  const onSubmit = async (formData: UserInfoEditForm) => {
    const { nickname, ...rest } = formData;
    const isNicknameChanged = nickname !== userInfo.nickname;

    if (nickname === '') {
      alert('닉네임은 필수 항목입니다.');
      return;
    }

    if (isNicknameChanged) {
      const isAvailable = await checkNicknameDuplicate(nickname);

      if (!isAvailable) {
        alert('닉네임이 이미 사용 중입니다.');
        return;
      }
    }

    const formToSend = isNicknameChanged ? formData : rest;

    try {
      const response = await fetch('/api/users/me', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formToSend),
      });

      if (!response.ok) throw new Error('업데이트에 실패했습니다.');

      route.push('/user/info');
    } catch (err) {
      alert('업데이트 중 오류가 발생했습니다 : ' + err);
    }
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    setValue('birth_date', formatted);
  };

  const handleGenderClick = (gender: string) => {
    setSelectedGender(gender);
    setValue('gender', gender);
  };

  return (
    <>
      <form className="flex flex-col w-full gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 align-center px-[22.5px]">
          <label className="text-body-3-m text-indigo-300">이름</label>
          <input
            className="flex justify-between h-[41px] align-center px-2 py-2 bg-indigo-5 rounded-[8px]"
            disabled
            {...register('name')}
          />
        </div>
        <div className="flex flex-col gap-1 align-center px-[22.5px]">
          <label className="text-body-3-m text-indigo-300">닉네임</label>
          <input
            className="flex justify-between h-[41px] align-center px-2 py-2 bg-indigo-5 rounded-[8px]"
            {...register('nickname')}
          />
        </div>
        <div className="flex flex-col gap-1 align-center px-[22.5px]">
          <label className="text-body-3-m text-indigo-300">생년월일</label>
          <input
            className="flex justify-between h-[41px] align-center px-2 py-2 bg-indigo-5 rounded-[8px]"
            {...register('birth_date', {
              required: '생년월일은 필수 항목입니다.',
              pattern: {
                value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                message: '유효한 날짜를 입력해주세요. (YYYY-MM-DD)',
              },
            })}
            onChange={handleBirthDateChange}
            inputMode="numeric"
          />
          {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date.message}</p>}
        </div>
        <div className="flex flex-col gap-1 align-center px-[22.5px]">
          <label className="text-body-3-m text-indigo-300">이메일 주소</label>
          <input
            className="flex justify-between h-[41px] align-center px-2 py-2 bg-indigo-5 rounded-[8px]"
            disabled
            {...register('email')}
          />
        </div>
        <div className="flex flex-col gap-1 align-center px-[22.5px]">
          <label className="text-body-3-m text-indigo-300">성별</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleGenderClick('MALE')}
              className={`flex-1 py-4 rounded-lg ${
                selectedGender === 'MALE' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
              }`}
            >
              남자
            </button>
            <button
              type="button"
              onClick={() => handleGenderClick('FEMALE')}
              className={`flex-1 py-2 rounded-lg ${
                selectedGender === 'FEMALE' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'
              }`}
            >
              여자
            </button>
          </div>
          <input type="hidden" {...register('gender')} />
        </div>
        <div className="flex flex-col gap-1 align-center px-[22.5px]">
          <button
            type="submit"
            className="fixed flex justify-center items-center bg-[#021730] text-[#F4F6F9] py-[14px] text-body-1-b h-14 w-[calc(100%-48px)] rounded-[8px] bottom-14"
          >
            수정 완료
          </button>
        </div>
      </form>
    </>
  );
}

export default UserInfoEditForm;
