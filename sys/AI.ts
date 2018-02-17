import { value } from 'json|Primes.json';
var $math = Math;
export namespace AI {
    export namespace tools {
        var INFINITY = 1 / 0;
        var argsTag = '[object Arguments]';
        function isFlattenable(value): boolean {
            return value instanceof Array || String(value) === argsTag;
        }
        export function baseFlatten<T>(array, depth, predicate?: typeof isFlattenable, isStrict?: boolean, result?: Array<T>) {
            var index = -1,
                length = array.length;

            predicate || (predicate = isFlattenable);
            result || (result = []);

            while (++index < length) {
                var value = array[index];
                if (depth > 0 && predicate(value)) {
                    if (depth > 1) {
                        baseFlatten(value, depth - 1, predicate, isStrict, result);
                    } else {
                        result.push(value);
                    }
                } else if (!isStrict) {
                    result[result.length] = value;
                }
            }
            return result;
        }
        export function flattenDeep<T>(array: any[]) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten<T>(array, INFINITY) : [];
        }

    }
    export namespace StringSimiarity {

        export interface IRating {
            target: string,
            rating: number
        }

        export interface IRatings {
            ratings: IRating[],
            bestMatch: IRating
        }

        export function compareTwoStrings(str1: string, str2: string): number {
            var result = null;
            result = calculateResultIfIdentical(str1, str2);
            if (result != null) {
                return result;
            }
            result = calculateResultIfEitherIsEmpty(str1, str2);
            if (result != null) {
                return result;
            }
            result = calculateResultIfBothAreSingleCharacter(str1, str2);
            if (result != null) {
                return result;
            }

            var pairs1 = wordLetterPairs<string>(str1.toUpperCase());
            var pairs2 = wordLetterPairs<string>(str2.toUpperCase());
            var intersection = 0;
            var union = pairs1.length + pairs2.length;
            pairs1.forEach(function (pair1) {
                for (var i = 0; i < pairs2.length; i++) {
                    var pair2 = pairs2[i];
                    if (pair1 === pair2) {
                        intersection++;
                        pairs2.splice(i, 1);
                        break;
                    }
                }
            });
            return (2.0 * intersection) / union;

            // private functions ---------------------------
        }

        export function findBestMatch(mainString: string, targetStrings: string[]): IRatings {
            var ratings = targetStrings.map(function (targetString) {
                return <IRating>{
                    target: targetString,
                    rating: compareTwoStrings(mainString, targetString)
                };
            });

            return {
                ratings: ratings,
                bestMatch: bestMatch(ratings)
            };

        }

        export function bestMatch(ratings: IRating[]) {
            var t = undefined;
            var cm = Number.NEGATIVE_INFINITY;
            for (var i = 0; i < ratings.length; i++) {
                var c = ratings[i];
                if (cm < c.rating) {
                    cm = c.rating;
                    t = c;
                }
            }
            return t;
        }

        function letterPairs(str) {
            var numPairs = str.length - 1;
            var pairs = [];
            for (var i = 0; i < numPairs; i++) {
                pairs[i] = str.substring(i, i + 2);
            }
            return pairs;
        }

        function wordLetterPairs<T>(str: string) {
            return tools.flattenDeep<T>(str.split(' ').map(letterPairs));
        }

        function isEdgeCaseWithOneOrZeroChars(str1, str2) {
            if (str1.length == str2.length && str1.length == 1) {
                return true;
            }
            return false;
        }

        function calculateResultIfIdentical(str1, str2) {
            if (str1.toUpperCase() == str2.toUpperCase()) {
                return 1;
            }
            return null;
        }

        function calculateResultIfBothAreSingleCharacter(str1, str2) {
            if (str1.length == 1 && str2.length == 1) {
                return 0;
            }
        }

        function calculateResultIfEitherIsEmpty(str1, str2) {
            // if both are empty strings
            if (str1.length == 0 && str2.length == 0) {
                return 1;
            }

            // if only one is empty string
            if ((str1.length + str2.length) > 0 && (str1.length * str2.length) == 0) {
                return 0;
            }
            return null;
        }

        export function Sort(rattings: IRatings) {
            return rattings.ratings.sort(com);
        }
        function com(a: IRating, b: IRating) {
            return b.rating - a.rating;
        }
    }
    export namespace Math {
        export class GCDExtended {
            public GCD:number;
            public FactorA: number;
            public FactorB: number;
            public constructor(gcd: number, factorA: number, factorB: number) {
                this.SetValues(gcd, factorA, factorB);
            }
            public SetValues(gcd: number, factorA: number, factorB: number): this {
                this.GCD = gcd;
                this.FactorA = factorA;
                this.FactorB = factorB;
                return this;
            }
        }

        /**
         * Calcuate (a*b) mod m 
         * @param a
         * @param b
         * @param m
         */
        export function mul_mod(a: number, b: number, m: number) {
            if (a >= m) a %= m;
            if (b >= m) b %= m;
            return (a + b) % m;
        }
        /**
         * Calcuate (base^exp) mod modulus
         * @param base
         * @param exp
         * @param modulus
         */
        export function PowMod(base: number, exp: number, modulus: number): number {

            base %= modulus;
            var result = 1;
            while (exp > 0) {
                if (exp & 1) result = (result * base) % modulus;
                base = (base * base) % modulus;
                exp >>= 1;
            }
            return result;
        }
        var primes = value as number[];
        export function getRandomPrime(cond: (p) => boolean, maxIndex?: number) {
            var time = performance.now();
            maxIndex || (maxIndex = primes.length - 1);
            do {

                if (performance.now() - time > 5000) throw null;
                var p = primes[$math.floor($math.random() * maxIndex)];
            }
            while (!cond(p))
            return p;
        }
        export function get_common_denom(e: number, PHI: number) {
            var great: number, temp: number, a: number;

            if (e > PHI) {
                while (e % PHI != 0) {
                    temp = e % PHI;
                    e = PHI;
                    PHI = temp;
                }
                great = PHI;
            }
            else {
                while (PHI % e != 0) {
                    a = PHI % e;
                    PHI = e;
                    e = a;
                }
                great = e;
            }
            return great;
        }
        export function GCD(a1: number, b1: number) {
            var a = a1, b = b1;
            while (b) {
                var c = a;
                a = b;
                b = c % b;
            };
            return a;
        };
        export function ExGCD(a1: number, b1: number, rem = 0) {
            var a = a1, b = b1;
            while (b != rem && b) {
                var a1 = a;
                var b1 = b;
                a = b;
                b = a1 % b1;
            };
            return { result: a1, factor: b1, rem: b, x: (a1 - rem) / b1 };
        }

        /*  return array [d, a, b] such that d = gcd(p, q), ap + bq = d */
        export function gcd_extended(p: number, q: number): GCDExtended {
            if (q == 0) return new GCDExtended(p, 1, 0);
            var vals = gcd_extended(q, p.mod(q));
            var b = vals.FactorA - vals.FactorB * $math.floor(p / q);
            return vals.SetValues(vals.GCD, vals.FactorB, b);
        }

        /* Returns true if numerator evenly divides denominator. */
        function divides(numerator: number, denominator: number) {
            if (numerator.mod(denominator) > 0)
                return false;
            return true;
        }

        /** Returns array of solutions to congruence equation
           factor*x = rem (mod modulus). Solutions are sorted */
        export function SolveCongurentEqu(factor: number, rem: number, modulus: number) {
            var m = $math.abs(modulus);
            var a = factor.mod(m);
            var b = rem.mod(m);
            var result_extended = gcd_extended(a, m);
            var solutions = new Array<number>();

            if (!divides(b, result_extended.GCD))
                return solutions;

            var firstSolution = (result_extended.FactorA * (b / result_extended.GCD)).mod(m);
            for (var i = 0; i < result_extended.GCD; i++) {
                var otherSolution = (firstSolution + i * (m / result_extended.GCD)).mod(m);
                solutions.push(otherSolution);
            }
            return solutions.sort(function (a, b) { return b - a });
        }

        Number.prototype.mod = function (n) {
            return ((this % n) + n) % n;
        }
    }
    export namespace Encryption {

        export interface ITransform {
            transform(byte: number): number;
            isValideByte(byte: number): boolean;
        }

        export interface RSAKey {
            n: number;
            e: number;
        }
        export interface RSACrypter {
            Encrypter: RSA;
            Decripter: RSA;
        }

        export class RSA implements ITransform {
            constructor(private key: RSAKey) { }
            public transform(byte: number) {
                return Math.PowMod(byte, this.key.e, this.key.n);
            }
            public isValideByte(byte: number) { return byte >= 0 && byte < this.key.n; }
        }
        export class FastRSA implements ITransform {
            private array = [];
            constructor(private key: RSAKey) { }
            public transform(byte: number) {
                return this.array[byte] || (this.array[byte] = Math.PowMod(byte, this.key.e, this.key.n));
            }
            public isValideByte(byte: number) { return byte >= 0 && byte < this.key.n; }
        }
        export function GenerateRSAKey(sourceMaxByte: number, transformedMaxByte: number): RSACrypter {
            var p = Math.getRandomPrime((p) => p > 100, 100);
            var q = Math.getRandomPrime((t) => {
                if (t == p) return false;
                var n1 = t * p;
                if (n1 < sourceMaxByte) return false;
                if (n1 > transformedMaxByte) return false;
                return true;
            }, 100);
            var n = p * q;
            var h = (p - 1) * (q - 1);
            var d;
            var time = performance.now();
            do {
                if (performance.now() - time > 5000) throw null;
                var e = Math.getRandomPrime((p) => p < h && p > 3);
                var sols = Math.SolveCongurentEqu(e, 1, h);
                if (sols.length == 0) continue;
                d = sols[0];
                break;
            } while (true);
            return {
                Decripter: new RSA({ n: n, e: d }),
                Encrypter: new RSA({ n: n, e: e })
            };
        }
        
        export function test(f: Function, iter = 1e4, args: any[]) {
            var deb = performance.now();
            var i = iter;
            while (--i)
                f.apply(null, args);
            return performance.now() - deb;
        }
    }
}