import { Outlet } from 'solid-app-router';
import { MDXProvider } from 'solid-mdx';
import { cx } from 'twind';
import { components } from '../../components/mdx-components/MdxComponents';

const View = () => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <MDXProvider components={components}>
      <article
        class={cx(
          'flex flex-col gap-5',
          '&>h2>a:(opacity-0 text-green-600 ml-2 transition-opacity) &>h3>a:(opacity-0 text-green-600 ml-2 transition-opacity) &>h4>a:(opacity-0 text-green-600 ml-2 transition-opacity)',
          '&>h2:hover:&>a:opacity-100 &>h3:hover&>a:opacity-100 &>h4:hover&>a:group-hover:opacity-100'
        )}
      >
        <Outlet />
      </article>
    </MDXProvider>
  );
};

export default View;
