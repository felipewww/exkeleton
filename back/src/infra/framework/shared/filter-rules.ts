// Tipos do FRONT que não devem fazer menção a COLUNA ou DB
export namespace FilterRules {

    //////////////////////////////////////////////
    // tipos usados nas Interfaces de INPUT (front/presenter/schema...)
    // tbm usados na construção das classes de RULE
    export interface LGE {
        gt: string;
        lt: string;
        eq: string;
    }

    export interface TEXT {
        exact: string,
        like: string
    }

    export interface EQUAL {
        value: number|string
    }

    export interface ENUM<T> {
        values: Array<T>
    }

    export interface DATE {
        start: string
        end: string
    }

    export interface SOME {
        values: Array<any>
    }

    export type TYPES = LGE | TEXT | ENUM<any> | EQUAL | DATE | SOME
    //////////////////////////////////////////////

    export abstract class BaseRule {
        public column: string
    }

    // Classes que vão converter INPUT para uma entidade de FILTRO e poder ser tipada e usada corretamente em data sources
    export class TextRule implements BaseRule {
        public exact: string
        public like: string

        constructor(
            public column: string,
            jsonRule: TEXT //aqui acontece a integração entre INPUT BODY convertendo para ENTITY de search
        ) {
            this.exact = jsonRule.exact
            this.like = jsonRule.like
        }
    }

    export class LGERule implements BaseRule {
        public gt: string;
        public lt: string;
        public eq: string;

        constructor(
            public column: string,
            jsonRule: LGE
        ) {
            this.gt = jsonRule.gt
            this.lt = jsonRule.lt
            this.eq = jsonRule.eq
        }
    }

    export class DateRule {
        start: string
        end: string

        constructor(
            public column: string,
            jsonRule: DATE
        ) {
            this.start = jsonRule.start
            this.end = jsonRule.end
        }
    }

    export class SomeRule {
        values: Array<any>

        constructor(
            public column: string,
            jsonRule: SOME
        ) {
            this.values = jsonRule.values
        }
    }

    export class EnumRule<T> extends SomeRule {
        constructor(
            public column: string,
            jsonRule: ENUM<T>
        ) {
            super(column, jsonRule)
        }
    }

    export class EqualRule {
        value: number|string

        constructor(
            public column: string,
            jsonRule: EQUAL
        ) {
            this.value = jsonRule.value
        }
    }
}

export interface ISearchConfig {
    page: number
    // ids?: Array<number>
}

export interface ListFilters<T extends Record<keyof T, FilterRules.TYPES> > {
    searchConfig: ISearchConfig,
    customFilters: T
}