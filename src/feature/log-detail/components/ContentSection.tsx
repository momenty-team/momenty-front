interface ContentSectionProps {
  children: React.ReactNode;
  snapIndex: number;
  isTextAreaFocus?: boolean;
}

function ContentSection({ children, snapIndex, isTextAreaFocus = false }: ContentSectionProps) {
  return (
    <section
      className="fixed top-[86px] w-full flex flex-col align-center overflow-y-scroll transition-[height] duration-300"
      style={{
        height: snapIndex > 1 && !isTextAreaFocus ? `calc(100vh - 100px)` : 'calc(100vh / 9 * 5 - 100px)',
      }}
    >
      {children}
    </section>
  );
}

export default ContentSection;
