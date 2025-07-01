interface ContentSectionProps {
  children: React.ReactNode;
  snapIndex: number;
  isTextAreaFocus?: boolean;
}

const getSheetHeight = (snapIndex: number, isTextAreaFocus: boolean) => {
  if (snapIndex > 1) {
    return isTextAreaFocus ? 'calc(100vh / 9 * 5 - 100px)' : 'calc(100vh - 100px)';
  }

  return 'calc(100vh / 9 * 7 - 100px)';
};

function ContentSection({ children, snapIndex, isTextAreaFocus = false }: ContentSectionProps) {
  return (
    <section
      className="fixed top-[86px] w-full flex flex-col align-center overflow-y-scroll transition-[height] duration-300"
      style={{
        height: getSheetHeight(snapIndex, isTextAreaFocus),
      }}
    >
      {children}
    </section>
  );
}

export default ContentSection;
