import { For } from 'solid-js';
import { badges } from '../../data/badges';
import LogoImage from '../../assets/images/logo.svg';

const Home = () => {
  return (
    <div class={'flex flex-col gap-3'}>
      <h1 class={'text-[36px] font-bold text-sky-600 text-center'}>
        <img
          width={'50'}
          height={'50'}
          class={'inline-block align-middle -mt-[3px] mb-[3px]'}
          alt={'Agile Solid'}
          src={LogoImage}
        />{' '}
        Agile Solid
      </h1>

      <p class={'text-center text-lg'}>Solid JS + TypeScript + Twind UI Components</p>
      <hr />
      <For each={badges} fallback={''}>
        {(group) => (
          <p class={'flex flex-row gap-1 justify-center'}>
            <For each={group} fallback={''}>
              {(badge) => (
                <a target={'_blank'} href={badge.href} rel="noreferrer">
                  <img
                    width={badge.width}
                    height={badge.height}
                    loading={'lazy'}
                    alt={badge.name}
                    src={badge.image}
                    srcSet={`${badge.image} 2x`}
                  />
                </a>
              )}
            </For>
          </p>
        )}
      </For>
      <hr />
      <h2 class={'text-lg font-bold'}>特点</h2>
      <ul class={'list-disc px-5'}>
        <li>Solid JS - 一个用于构建用户界面，简单高效、性能卓越的 JavaScript 库。</li>
        <li>Typescript - TypeScript 是具有类型语法的 JavaScript。</li>
        <li>Jest - Jest 是一款优雅、简洁的 JavaScript 测试框架。</li>
        <li>ESLint - ESLint 静态分析你的代码以快速发现问题。</li>
        <li>Prettier - 一个“有态度”的代码格式化工具</li>
        <li>Husky & Lint Staged - 在提交暂存文件之前，运行脚本</li>
      </ul>
      <hr />
      <p class={'p-2 pl-3 border-l-2 border-l-gray-300 bg-gray-50'}>正在开发中, 目前仅供参考学习</p>
    </div>
  );
};

export default Home;
