'use client';

function PrivacyPage() {
  return (
    <>
      <main className="w-full pb-12">
        <span className="text-subtitle-2-sb p-4 pt-4 pb-1">개인정보 처리방침</span>
        <div className="px-4">
          <p className="text-body-3-m mt-4 text-indigo-300">
            모먼티(Momenty)는 개인정보 보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한
            이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 개인정보 처리방침을 수립·공개합니다.
          </p>

          <h2 className="text-body-1-m mt-6 text-indigo-500">1. 개인정보의 수집 및 이용 목적</h2>
          <p className="text-body-3-m mt-2 text-indigo-300">
            모먼티는 다음의 목적을 위해 개인정보를 수집하고 이용합니다.
          </p>
          <ul>
            <li className="text-body-3-m mt-2 ml-2 text-indigo-300">• 필회원 가입 및 관리</li>
            <li className="text-body-3-m ml-2 text-indigo-300">• 필서비스 제공 및 맞춤형 콘텐츠 제공</li>
            <li className="text-body-3-m ml-2 text-indigo-300">• 필건강 기록 분석 및 통계 정보 제공</li>
            <li className="text-body-3-m ml-2 text-indigo-300">• 필고객 문의 응대 및 공지사항 전달</li>
          </ul>

          <h2 className="text-body-1-m mt-6 text-indigo-500">2. 수집하는 개인정보 항목</h2>
          <ul>
            <li className="text-body-3-m mt-2 ml-2 text-indigo-300">
              • 필수 항목: 이름, 이메일, 생년월일, 성별, 닉네임
            </li>
            <li className="text-body-3-m ml-2 text-indigo-300">• 선택 항목: 프로필 이미지, 건강 관련 데이터</li>
          </ul>

          <h2 className="text-body-1-m mt-6 text-indigo-500">3. 개인정보의 보유 및 이용 기간</h2>
          <p className="text-body-3-m mt-2 text-indigo-300">
            이용자의 개인정보는 수집 및 이용 목적이 달성되면 지체 없이 파기합니다. 단, 관련 법령에 따라 일정 기간 보관이
            필요한 경우에는 해당 기간 동안 안전하게 보관됩니다.
          </p>

          <h2 className="text-body-1-m mt-6 text-indigo-500">4. 개인정보의 제3자 제공</h2>
          <p className="text-body-3-m mt-2 text-indigo-300">
            모먼티는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.
          </p>
          <ul>
            <li className="text-body-3-m mt-2 ml-2 text-indigo-300">• 이용자가 사전에 동의한 경우</li>
            <li className="text-body-3-m ml-2 text-indigo-300">• 법령에 의거하거나 수사기관의 요청에 따른 경우</li>
          </ul>

          <h2 className="text-body-1-m mt-6 text-indigo-500">5. 이용자의 권리 및 행사 방법</h2>
          <p className="text-body-3-m mt-2 text-indigo-300">
            이용자는 언제든지 자신의 개인정보에 대해 열람, 수정, 삭제, 처리 정지를 요청할 수 있습니다.
          </p>

          <h2 className="text-body-1-m mt-6 text-indigo-500">6. 개인정보 보호 책임자</h2>
          <p className="text-body-3-m mt-2 text-indigo-300">
            모먼티는 개인정보 처리에 관한 업무를 총괄하고, 개인정보 관련 문의 사항에 대해 신속하게 답변드릴 수 있도록
            개인정보 보호 책임자를 지정하고 있습니다.
          </p>
          <ul>
            <li className="text-body-3-m mt-2 ml-2 text-indigo-300">• 책임자: 김혜준</li>
            <li className="text-body-3-m ml-2 text-indigo-300">• 이메일: alice5855@koreatech.ac.kr</li>
          </ul>

          <h2 className="text-body-1-m mt-6 text-indigo-500">7. 개정 사항 안내</h2>
          <p className="text-body-3-m mt-2 text-indigo-300">
            이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 회사 정책에 따라 변경될 수 있습니다.
          </p>
          <p className="mt-2 text-body-3-m text-indigo-300">시행일: 2025년 5월 18일</p>
        </div>
      </main>
    </>
  );
}

export default PrivacyPage;
