'use client';

function TermPage() {
  return (
    <>
      <main className="w-full pb-12">
        <span className="text-subtitle-2-sb pl-4">모먼티 약관 확인</span>
        <div className="px-4">
          <p className="text-body-3-m mt-4 text-indigo-300">
            본 약관은 모먼티(Momenty)가 제공하는 서비스(이하 “서비스”)의 이용과 관련하여 회사와 회원 간의 권리, 의무 및
            책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>

          <h2 className="text-body-1-m mt-6 text-indigo-500">1. 약관의 효력 및 변경</h2>
          <ul>
            <li className="text-body-3-m mt-2 ml-2 text-indigo-300">
              • 이 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.
            </li>
            <li className="text-body-3-m ml-2 text-indigo-300">
              • 회사는 필요한 경우 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다.
            </li>
            <li className="text-body-3-m ml-2 text-indigo-300">
              • 변경된 약관은 공지사항을 통해 사전 공지하며, 공지 이후에도 서비스를 계속 이용할 경우 변경된 약관에
              동의한 것으로 간주됩니다.
            </li>
          </ul>

          <h2 className="text-body-1-m mt-6 text-indigo-500">2. 이용계약의 체결</h2>
          <p className="text-body-3-m mt-2 text-indigo-300">
            회원가입은 이용자가 약관에 동의하고, 회사가 승낙함으로써 성립됩니다.
          </p>

          <h2 className="text-body-1-m mt-6 text-indigo-500">3. 회원의 의무</h2>
          <ul>
            <li className="text-body-3-m mt-2 ml-2 text-indigo-300">
              • 회원은 본 약관 및 관계법령을 준수해야 하며, 부정한 방법으로 서비스를 이용해서는 안 됩니다.
            </li>
            <li className="text-body-3-m ml-2 text-indigo-300">
              • 타인의 정보를 도용하거나 허위 정보를 입력해서는 안 됩니다.
            </li>
          </ul>

          <h2 className="text-body-1-m mt-6 text-indigo-500">4. 회사의 의무</h2>
          <p className="text-body-3-m mt-2 text-indigo-300">
            회사는 관련 법령을 준수하며, 안정적인 서비스 제공을 위해 노력합니다.
          </p>

          <h2 className="text-body-1-m mt-6 text-indigo-500">5. 서비스의 변경 및 중단</h2>
          <p className="text-body-3-m mt-2 text-indigo-300">
            회사는 운영상, 기술상의 필요에 따라 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다. 단, 회원에게
            불리한 경우 사전에 고지합니다.
          </p>

          <h2 className="text-body-1-m mt-6 text-indigo-500">6. 계약 해지 및 이용 제한</h2>
          <ul>
            <li className="text-body-3-m ml-2 text-indigo-300">
              • 회원은 언제든지 서비스 탈퇴를 요청할 수 있으며, 회사는 이를 즉시 처리합니다.
            </li>
            <li className="text-body-3-m ml-2 text-indigo-300">
              • 회원이 약관을 위반할 경우 회사는 서비스 이용을 제한하거나 계약을 해지할 수 있습니다.
            </li>
          </ul>

          <h2 className="text-body-1-m mt-6 text-indigo-500">7. 면책 조항</h2>
          <p className="text-body-3-m mt-2 text-indigo-300">
            회사는 천재지변, 불가항력, 회원의 고의 또는 과실로 인한 손해에 대해 책임을 지지 않습니다.
          </p>

          <h2 className="text-body-1-m mt-6 text-indigo-500">8. 분쟁 해결</h2>
          <p className="text-body-3-m mt-2 text-indigo-300">
            회사와 회원 간 발생한 분쟁은 관련 법령에 따라 해결합니다. 관할 법원은 회사의 본사 소재지를 기준으로 합니다.
          </p>

          <p className="mt-2 text-body-3-m text-indigo-300">시행일: 2025년 5월 18일</p>
        </div>
      </main>
    </>
  );
}

export default TermPage;
