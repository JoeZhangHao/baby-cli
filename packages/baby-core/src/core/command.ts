import commander from 'commander';
import type { QuestionCollection } from 'inquirer';

// 插件参数
export type Options = [
  directive:
    | `-${string},--${string} [${string}]`
    | `-${string},--${string} <${string}>`,
  description?: string,
  defaultValue?: string | boolean | undefined
];

export type Command = commander.Command;

export type UnionToMapping<S, T = string> = [S] extends [infer P]
  ? {
      [K in P & string]: T;
    }
  : never;

// 获取括号内字段类型
export type UnwrapBracket<T> = T extends `[${infer P1}]`
  ? P1
  : T extends `<${infer P2}>`
  ? P2
  : never;

// 解构参数类型
export type ExtractArgsName<T> = T extends `-${infer S},--${infer F} ${infer P}`
  ? UnwrapBracket<P>
  : never;

// 匹配 options
export type GetOptionsDirective<T extends Options> = T[0];

// 先根据 options 匹配第一项参数，在获取参数括号中的类型，最后根据此类型推断参数絫
export type GetOptionsArgs<T> = [T] extends [Options]
  ? UnionToMapping<ExtractArgsName<GetOptionsDirective<T>>>
  : never;

export type GetArgs<T> = {
  [P in UnwrapBracket<T>]: string;
};

export interface CommandConfig<T extends Options = any> {
  /**
   * 命令的标示 比如: init
   */
  id: string;
  /**
   * options 参数
   */
  option?: T[];
  /**
   * prompting 用户交互信息收集
   *
   */
  prompting?: QuestionCollection[];
  /**
   * 参数 比如: <params>
   */
  args?: string;
  /**
   * description
   */
  description?: string;
  /**
   * examples
   */
  examples?: string[];
  /**
   * subcommand: 注册子命令
   */
  subCommands?: this[];
  run: (args: { args: string[]; optionsArgs: GetOptionsArgs<T> }) => void;
}

// 定义命令，可根据配置项推断命令内的参数
export function defineCommand<T extends Options = any>(
  config: CommandConfig<T>
) {
  return config;
}
