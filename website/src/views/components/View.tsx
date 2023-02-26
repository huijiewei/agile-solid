import { Edit, Github } from '@agile-solid/icons';
import { kebabCase, pascalCase } from '@agile-solid/utils';
import type { MDXContent } from 'mdx/types';
import { useParams } from '@solidjs/router';
import { createComponent, createEffect, createSignal, onCleanup, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { cx } from '@twind/core';
import { ErrorAlert } from '../../components/error-alert/ErrorAlert';
import { LazyLoading } from '../../components/lazy-loading/LazyLoading';
import { components } from '../../data/components';
import Image500 from '../../assets/images/500.png';

type Mdx = {
  title?: string;
  description?: string;
  default?: MDXContent;
};

const View = () => {
  const params = useParams();

  const [mdx, setMdx] = createStore<Mdx>();
  const [error, setError] = createSignal<boolean>();

  const githubUrl = 'https://github.com/huijiewei/agile-solid/blob/main';

  let docLink = '';
  let sourceLink = '';

  createEffect(() => {
    const componentName = pascalCase(params.component);
    const componentSlug = kebabCase(componentName);

    docLink = `${githubUrl}/website/src/docs/components/${componentName}.mdx`;
    sourceLink = `${githubUrl}/packages/components/src/${componentSlug}/${componentName}.tsx`;

    import(`../../docs/components/${componentName}.mdx`)
      .then((mdx) => {
        setMdx(mdx);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });

    onCleanup(() => {
      setError(false);
      setMdx({ default: undefined });
    });
  });

  return (
    <Show
      when={!error()}
      fallback={
        <ErrorAlert title={`组件文档不存在`}>
          <img class={'w-[320px] aspect-[3/2] items-center'} src={Image500} alt={`组件文档不存在`} />
        </ErrorAlert>
      }
      keyed
    >
      <Show when={!!mdx.default} fallback={<LazyLoading class={'h-96'} />} keyed>
        <article
          class={cx(
            'flex flex-col gap-5',
            '&>h2>a:(opacity-0 text-green-600 ml-2 transition-opacity) &>h3>a:(opacity-0 text-green-600 ml-2 transition-opacity) &>h4>a:(opacity-0 text-green-600 ml-2 transition-opacity)',
            '&>h2:hover:&>a:opacity-100 &>h3:hover&>a:opacity-100 &>h4:hover&>a:group-hover:opacity-100'
          )}
        >
          <div class={'flex flex-row items-center justify-between'}>
            <h1 class={'text-xl font-bold'}>{mdx.title}</h1>
            <a class={'inline-flex flex-row items-center'} target={'_blank'} href={sourceLink} rel="noreferrer">
              <Github class={'mr-1'} />
              查看源代码
            </a>
          </div>
          <p>{mdx.description}</p>
          {mdx.default && createComponent(mdx.default, { components })}
          <p>
            <a class={'inline-flex flex-row items-center'} target={'_blank'} href={docLink} rel="noreferrer">
              <Edit class={'mr-1'} />
              编辑这个页面
            </a>
          </p>
        </article>
      </Show>
    </Show>
  );
};

export default View;
