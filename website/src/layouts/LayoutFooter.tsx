export const LayoutFooter = () => {
  return (
    <footer class={'border-t border-t-gray-200 py-3 px-5 text-slate-600'}>
      <div class={'flex justify-between text-sm font-medium'}>
        <div>Copyright &copy; 2022</div>
        <div>
          Proudly made in
          <span class={'mx-1'} aria-label="China" role="img">
            🇨🇳
          </span>
          by Huijie
        </div>
      </div>
    </footer>
  );
};
