import { ESLintUtils } from "@typescript-eslint/utils";
import rule from "./constructor-parameters-ordered-alphabetical";

class A {
  constructor(protected readonly a: string, protected readonly b: string) {}
}

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
});

ruleTester.run("constructor-parameters-ordered-alphabetical", rule, {
  valid: [
    {
      options: rule.defaultOptions,
      code: `
class A {
  constructor(protected readonly a: string, protected readonly b: string) {}
}`,
    },
  ],
  invalid: [
    {
      options: [
        {
          highPriorityWords: {
            commandBus: 1,
            queryBus: 2,
            Repository: 3,
          },
          excludeFunctions: [],
        },
      ],
      code: `
class A {
  constructor(
    @Inject(DateToWeekdayConverter)
    private readonly dateToWeekdayConverter: Converter<Date, Weekday>,
    @Inject(DateRangeToMinutesRangeConverter)
    private readonly dateRangeToMinutesRangeConverter: Converter<DateRange, MinutesRange>,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(TrainerScheduleWeekdayRangeToMinutesRangeConverter)
    private readonly trainerScheduleWeekdayRangeToMinutesRangeConverter: Converter<
      TrainerScheduleWeekdayRange,
      MinutesRange
    >,
  ) {}
}`,
      output: `
class A {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(DateRangeToMinutesRangeConverter)
    private readonly dateRangeToMinutesRangeConverter: Converter<DateRange, MinutesRange>,
    @Inject(DateToWeekdayConverter)
    private readonly dateToWeekdayConverter: Converter<Date, Weekday>,
    @Inject(TrainerScheduleWeekdayRangeToMinutesRangeConverter)
    private readonly trainerScheduleWeekdayRangeToMinutesRangeConverter: Converter<
      TrainerScheduleWeekdayRange,
      MinutesRange
    >,
  ) {}
}`,
      errors: [
        {
          messageId: "constructor-parameters-not-ordered-alphabetical",
        },
      ],
    },
    {
      options: rule.defaultOptions,
      code: `
class A {
  constructor(protected readonly c: string,
              protected readonly a: string,
              protected readonly b: string
  ) {}
}`,
      output: `
class A {
  constructor(protected readonly a: string,
              protected readonly b: string,
              protected readonly c: string
  ) {}
}`,
      errors: [
        {
          messageId: "constructor-parameters-not-ordered-alphabetical",
        },
      ],
    },
    {
      options: rule.defaultOptions,
      code: `
class A {
  constructor(
              protected readonly c: string,
              protected readonly a: string,
              protected readonly b: string
  ) {}
}`,
      output: `
class A {
  constructor(
              protected readonly a: string,
              protected readonly b: string,
              protected readonly c: string
  ) {}
}`,
      errors: [
        {
          messageId: "constructor-parameters-not-ordered-alphabetical",
        },
      ],
    },
  ],
});
