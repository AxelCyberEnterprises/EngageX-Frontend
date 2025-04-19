import { Link } from "react-router-dom";

function Intro() {
  return (
    <section className="flex justify-center bg-alice-blue px-10 lg:px-20 py-28 items-center">
      <div className="gap-y-24 relative rounded-2xl flex w-full flex-col items-center bg-gradient-to-b from-[#E3E1E100] to-[#E3ECFF78]">
        <div className="space-y-10 flex flex-col items-center">
          <div className="px-3 py-3 flex gap-2 items-center w-max border rounded-[6px] bg-white border-[#E1E5E7] mx-auto">
            <svg
              width="16"
              height="16"
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.0714 3.63167C6.47007 2.46501 8.08207 2.42967 8.55474 3.52567L8.59474 3.63234L9.13274 5.20567C9.25603 5.5665 9.45527 5.89668 9.71702 6.17396C9.97877 6.45123 10.2969 6.66915 10.6501 6.81301L10.7947 6.86701L12.3681 7.40434C13.5347 7.80301 13.5701 9.41501 12.4747 9.88767L12.3681 9.92768L10.7947 10.4657C10.4338 10.5889 10.1035 10.7881 9.82608 11.0498C9.54869 11.3116 9.33067 11.6298 9.18674 11.983L9.13274 12.127L8.5954 13.701C8.19674 14.8677 6.58474 14.903 6.11274 13.8077L6.0714 13.701L5.53407 12.1277C5.41086 11.7667 5.21165 11.4364 4.9499 11.159C4.68814 10.8816 4.36993 10.6636 4.01674 10.5197L3.87274 10.4657L2.2994 9.92834C1.13207 9.52967 1.09674 7.91767 2.19274 7.44567L2.2994 7.40434L3.87274 6.86701C4.23356 6.74371 4.56374 6.54447 4.84102 6.28272C5.11829 6.02097 5.33621 5.7028 5.48007 5.34967L5.53407 5.20567L6.0714 3.63167ZM7.3334 4.06234L6.79607 5.63567C6.60833 6.18588 6.30292 6.68854 5.90109 7.10867C5.49927 7.5288 5.0107 7.85629 4.4694 8.06834L4.30274 8.12901L2.7294 8.66634L4.30274 9.20367C4.85294 9.39141 5.35561 9.69683 5.77573 10.0987C6.19586 10.5005 6.52335 10.989 6.7354 11.5303L6.79607 11.697L7.3334 13.2703L7.87074 11.697C8.05848 11.1468 8.36389 10.6441 8.76571 10.224C9.16753 9.80388 9.65611 9.47639 10.1974 9.26434L10.3641 9.20434L11.9374 8.66634L10.3641 8.12901C9.81387 7.94127 9.3112 7.63585 8.89107 7.23403C8.47094 6.83221 8.14345 6.34364 7.9314 5.80234L7.8714 5.63567L7.3334 4.06234ZM12.6667 1.33301C12.7915 1.33301 12.9137 1.36799 13.0195 1.43399C13.1253 1.49998 13.2105 1.59434 13.2654 1.70634L13.2974 1.78434L13.5307 2.46834L14.2154 2.70167C14.3404 2.74414 14.45 2.82275 14.5302 2.92755C14.6105 3.03235 14.6578 3.15862 14.6663 3.29036C14.6747 3.42209 14.6438 3.55336 14.5775 3.66753C14.5113 3.7817 14.4126 3.87363 14.2941 3.93167L14.2154 3.96367L13.5314 4.19701L13.2981 4.88167C13.2555 5.00663 13.1769 5.11614 13.072 5.19634C12.9672 5.27653 12.8409 5.3238 12.7092 5.33216C12.5774 5.34051 12.4462 5.30957 12.3321 5.24326C12.2179 5.17695 12.1261 5.07825 12.0681 4.95967L12.0361 4.88167L11.8027 4.19767L11.1181 3.96434C10.9931 3.92188 10.8835 3.84326 10.8033 3.73846C10.723 3.63366 10.6756 3.5074 10.6672 3.37566C10.6588 3.24393 10.6897 3.11265 10.7559 2.99848C10.8222 2.88431 10.9208 2.79238 11.0394 2.73434L11.1181 2.70234L11.8021 2.46901L12.0354 1.78434C12.0804 1.65262 12.1654 1.53828 12.2786 1.45734C12.3918 1.3764 12.5276 1.33292 12.6667 1.33301Z"
                fill="#4C5C75"
              />
            </svg>
            <p className="small">INTRO</p>
          </div>

          <div className="lg:w-[50%] text-center mx-auto space-y-4 flex flex-col items-center">
            <h4 className="h-max font-montreal leading-snug">
              Why settle for ordinary when you can be extraordinary
            </h4>
            <p className="text-dark-electric-blue leading-normal">
              Our platform offers a groundbreaking solution for anyone aiming to
              improve their public speaking, pitch delivery, or presentation
              skills. Personalized coaching feedback is powered by a hybrid of
              AI technology and human insight from certified coaches, available
              virtually, in person, or by phone based on your schedule,
              delivering expert guidance that goes far beyond basic peer
              evaluation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 mx-auto w-[80%] gap-[50px]">
          <div className="rounded-2xl py-10 w-[20rem] px-10 bg-gradient-to-b to-white from-alice-blue flex flex-col justify-center items-center text-center gap-y-9">
            <div className="p-4 rounded-xl bg-gunmetal w-max">
              <svg
                width="22"
                height="22"
                className="h-5 w-5"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="22" height="22" fill="url(#pattern0_1496_6996)" />
                <defs>
                  <pattern
                    id="pattern0_1496_6996"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_1496_6996"
                      transform="scale(0.015625)"
                    />
                  </pattern>
                  <image
                    id="image0_1496_6996"
                    width="64"
                    height="64"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFFklEQVR4nO2ae4hXRRTHx1zDZ08rC62s1ortYRZlbEhFL6QUi55YSe8y/+gFFj0po/qjUKLIgig1iJJUAi0yirX3AzJ6WWlhaSrZS1N7feKws3V/587d3517Z/a3u7/f57/d38z3nLkzd+6Zc8aYBg0aNGjQoEGDHgjQBxgPvAocZeoFYARwK/A1/3Ob6eUzfQgwHXgb+Ic0y0xvAtgPuAJ4GlhNdf4EhpgePMMtwNXAM8AainGS6QkA2wFHAtcBC4ANngP9FphpN78k0013BdgZuNDO8PoCs/sJcI/s9rJirOZVqs18050ABgOXAEuAPzwHvNq+/1OAfTL0W/TKMN0B4HBgNvCrx4DX2NUhG1+zx97xi9LZPf4IM7CfquczPlMaeQ3mAZcDo0xBgDeU7njT1QADgVnA31UG/SlwH9AqG2Eg248qGzeF0M0NcCzwVSeDXmWjtgMi2b9G2Xsihh0nwARgS8bAlwGnhZrpLIDjtN2Y9v4DmGyjL9cyP8V0EcBQZX99Vxg9BtimDMv7/wDQP5CN/T3abla+DArhQ2cBzUplUFbCFBMI4Hhgq2yYOduvUP4cHMqXFMBTjpmfYAIBjAZ+TujPyNFnqfLp1FD+VAAc6vjU3WkCAYx0HITE3hjPSbkslE8VAI8rQx8G/J7vBnxBmqk5+s5Qfe4I4VMFsrk5QtszTbhA6k3H4O/K2V+O0UlmhvCrAuB0ZWRliNkH+gGLHYOf7aExSfWdW9avFMD9yshjJgDAI47BLwKaPDROVP0Xh/CtAuAlZeQ8UxJgmmPwbcAATx3JESR5p6xvKRwb1GhTAokWHZGknCmGFtBqVjoryvjmRH2bhRGmIMCBwE9KT/4+qKDesOiJEdKzNaBEJKlXk2ifXMK3XZTe2qJamQC/KyP9CyZDXybNlb5aSneI0ttYRs8J8J0ysq/xRAIUx+Bn+epkxChJNpfVTAG8ooycazyQnL0jjJacQT8fnQztvvqVKquZQqIyZeQFkxNgL2Cd6r9W/p9Xo4p+U1c8gBbfQ0rCude1g8C4gL4NUvqbQmlX4BiI7OY7ea4c4QYTNyu0IaS+ToDqlLdEiAMz2o9xFESWdFR2QiEJEGXjy5D6FdianOYDYLhqtz2w3FEL2NMEBjhB2WkLbUN/ciRexxHJSYq6r20ndbwksnLOMBEALlW2no1hR0deuiLTwefA7Y7IMffx1hfgoSJ5hBArQWp5eZAgaseIvugVeU4sW67i5LU5iqATTSRsNkmn6J3V5GgAw4EnMwolz0W2fZaytyqmvU6xBdIkcoDaW7UJ+irYGyZJHg6pnxtgV8erUJHTBw4DfgTODmRzlON80RpC2xtHavqH5K0texR+K/H7gz55vwybC5XN5aGDrFwAOzhuatyo2kx17A8SWg8raPNih95kUwtIX1aSZT5YtbnI1vs03/teb7Mbn9Z6L3YpPhMbCie5O6Ndqx2wi3nVLlHY2OMW4C/VV+4oHGFqAe31wiSyKY3spP0ejvt9HchndD5wgZTH7XlCSmZH21sm32T0i1MLzANws3Jmac4Mzr057hRVQ84X15taArymnJrm0Xcs8FHBwW+Ukljc0VXBftp+U441e2o02Rukn+Uc+FZbTqvdfcAO7HuqZ6VPiYc51l6ja7Pv+zabS/wYmAOcLydR010AxqkH8K6pJ4CJvhtgb38AL5p6gnQu7n1TT9B+OTrJOlNP0F6UlDt6m+wD2FJrn3z5F897Wnztka1vAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>
            </div>
            <div className="space-y-4">
              <h6 className="font-montreal">
                Realistic environment enhancements
              </h6>
              <p className="">
                Responsive virtual environments tailored to your presentation
              </p>
            </div>
          </div>
          <div className="rounded-2xl py-10 w-[20rem] px-10 bg-gradient-to-b to-white from-alice-blue flex flex-col justify-center items-center text-center gap-y-9">
            <div className="p-4 rounded-xl bg-gunmetal w-max">
              <svg
                width="24"
                className="h-5 w-5"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="24" height="24" fill="url(#pattern0_1496_7003)" />
                <defs>
                  <pattern
                    id="pattern0_1496_7003"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_1496_7003"
                      transform="scale(0.02)"
                    />
                  </pattern>
                  <image
                    id="image0_1496_7003"
                    width="50"
                    height="50"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEoUlEQVR4nO2aa4hVVRTHj2blg9Qpe0c1omYQGfahEooKEyKJMoSURG0+JKSSGhX4IOxDPhC/FBFGWBk9SBwV7UEQPvKDkNoTCh+RaKUzCjrmWOkvVvM/uLndc+8+Z9a9cz/0hwOXs/f6r7XP3mvttde+SfI/fAD0Ae4HVgLbgb1Ah559wDbgJWAM0CtpNAAXAC3AIeLxNTChYQYEXA3sDAzcDbwI3A00A/313AiMA5YB+4P+a4GBPT2IYcDPMugn4OFIuQuBJ4Gjkv0BGFJ7i8sbY1/5GxnyBTC4AMf1wC5x7AD61sbaykaYQxu+AwZ0g+dyBQXDIl8r4/ziNHAWuNWB7y7gHHDKuH2sjFP8vL7gR46ca8X5jBdnjFLzCcNjjpwTUn/z4oxR+quUui0D4DpxHvTijFH6p5Re7MjZV5xnvDhjlLZLabMjZ7M427w4Y5RuldJHHTkfEeeWIsJXAPOAT5QndSoE2t6wxGJ8htxMKd3sMQgDsEGcs5JYAL2BF2R0JRwEpgGXlcgPAk4q9j8UrTgDypjPKkuOzxCAVTL0L+BDTetIpR0DgNHA28GAOkrjOzBbbUeAm6OVl/eNNGuem8QCeEJCx4GxFfr1MuOBz/S1DLNL2tPl0AbcE22EANwOHBbHx7lSeuBbCbbkkJkimZPh1CtkrlObDfY14JrI/GqFVoRhk62GPIMYGiyH3tGCXbJ2ujNMKnMqXGzxX+22x3wATAVu0lK1Z4Q+yBoFlXRpL7W0Po8tpvRxEbyfS7BLdpFkl2a032K5F/B3lQCSzp7N5Ki8dpSGzZUFZKdLdnWVfjfItzaUObNvNIfu9kYKzJExLxeQbYkZSF3Aead9o4DsgipL6zbNwhE96wsvnciNx/BpAdn3JDu9TNuYwNlDdAJ3ug0gUHipduOjecswQbwfUaZtj9peVWi11MdCsWGX6yCCTcym3TAsh5zt+uk+8p8PEITTcI9p0rvTnmNIya2uhOpKQ3PI2X5wQLLjyrRbLQvNgs3GlcDrevdVLQYyQ+SvFJC1ZWN4KqN4kOUjd7gNoIyzW7myXw65fkEN696MPqOAVuB3Pes8KixZBl0UlCs7YxxefpX6wH5xDAbe0kmxXb9zF+i6BUu5gV+yIlAFRzeZkXqXZr0h1if1BucdcX5E34Xquyp4Z8U5w4N6DH/U3PBS2DqXclvLTRX6XQL8pr4PBO9t1y5Fa9ITAD6vFh6tEKA+20J/ko+s1oGqTb/r6yMpdF9h6EgyICNJfaMhAQyUke0RaclVSaMCGCIjD1foc8C7EOcOYLyM3Fehz/fqMzlpNNB1xn4aOFEtBAPPpn6kU1++s3UtoERufrAZGt6xG9kqhbw3g/6HtK/U32foyoHWlCR1P5ZWQ6pwTNSFZQrjerdmuVQIYLiSODtIpaUXuxUaW+RuWznXfapMptcK55QcRp9tckFf8FSwvpcD1zrfIS7RQQvpmujF/y/srjsocbZmVdQdQ3hYaRzvRdwU7MbL6vH3CC0504WO0YM8SJ8ToV3C93GxND6kpwWIeR6EX4pspouF+XTPku6tHmTH6Xkc8xgIDYJu/afkHwYmM9UqLaeQAAAAAElFTkSuQmCC"
                  />
                </defs>
              </svg>
            </div>
            <div className="space-y-4">
              <h6 className="font-montreal">Interactive audience simulation</h6>
              <p className="">
                Get AI-generated audience feedback using realistic audience
                simulations
              </p>
            </div>
          </div>
          <div className="rounded-2xl py-10 w-[20rem] px-10 bg-gradient-to-b to-white from-alice-blue flex flex-col justify-center items-center text-center gap-y-9">
            <div className="p-4 rounded-xl bg-gunmetal w-max">
              <svg
                width="24"
                className="h-5 w-5"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <rect width="24" height="24" fill="url(#pattern0_1496_7010)" />
                <defs>
                  <pattern
                    id="pattern0_1496_7010"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image0_1496_7010"
                      transform="scale(0.02)"
                    />
                  </pattern>
                  <image
                    id="image0_1496_7010"
                    width="50"
                    height="50"
                    preserveAspectRatio="none"
                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD1ElEQVR4nO2ZS2hVVxSGTxRfLYIQE00cWHDgpArRmTqxDqOxaUe2zkpbsQPFZ0eCL+xEizrwMdJRO2gKWiQKjVWvClVHalHxgYYSEESKlnilmk9W8u+6OZ5777nn7nsS8P5w4WSvvdf61zl77/VIFDXQQAO5AJgGdAE7gF7gJjAAFPUb0Fiv5tjcadFYADAR+BI4CbykehS19gvTFY2CA5OA74B+j9R/wFlgJ7AS+Bho8eQtGvsU2KW5tsbhEbDWdOflxCfAA4/ADeBbYHqJ+cMoIZuutbblHEz30no6MAU4CAx5Ro8DTRXWFYALFeY0Acc8vWbjADA5tBP25i57+/qwnp8D7QH0twHPpPOIbBguAc2hnPgIuCPF94AOjfdobEMAGxuk61f93SFbhtvA7BBfwjlxFWj1ZK26RmcFcGSWdLV6YzOAa54zzbWcicueE1NrJZyBw1TPmYuZzowOtttO/7+pvMHIl7kvLvuzXLFDOnTDZ2I0ASxQwH2d+mpWsHNx4nA0RsDbm/JBqi2m6OqjZwxsrV9inNamyZ36vWBnccKwIzfmMeg2czHLOLl0pnRupgTQpR0WbduBjSGCXjVgxPZC72oe5qBxl86sKqfgN036Jk/inv3ZwDbgLrC+xBzLzQwnytUTL5WRJiaA9YDi1Wrgd91KL4DPy8xvEcdiYj2jQsdwtt7kZW8RcBT4xzvET4DFKdb+ofkrkoRWRxh2BSK6HOgD/hXBM0A3sBW4xbuwoDc3pe7dWrM9SWglqKErgBNWOFWDK3bNRun1W+FmOJUk/EvCeQG+BNrDm5Sit+nZpec+7IL5sEob87X2RpLQmgPUetBVwho2Jci2xJw4BIzPYKNZ6weShPG3VcjoiCuQ2hJkFgscvs+guxDjWEyaFO+CXKijI88y6i7EOA4mTXoq4cwsRjw9dlMZNifI7MYy9AXIvwwPk4SuEqwpbQc6paeoM9Gu3xZv+3bWaKNDev5MEp6WsLsWI7GYlISdAfR/Jl0nyxnfU6sh78v0KWt9rufOQLp/KJmVA8skPBeNcQDnxfXdahH4QHv41WgWUpUQSxqnlJp0ejTT+DQA1ohjb5oc5rqKGGvHfJV3YeVDhdXX4uIXVivKLRrvNR5+9NKW6towAcHbttSAOLlMeVylhetj16U16ebkxjwGs+01Ch3WRZWgBoT7fD9X6rbnAUa21E/iZNwmpF24RA26wRC93VrBSGYwKE5Lql28D3hcyhG1/EPjYglbVs/8DezN+C7KOlovNAUnm8aRgPrcf8IajkTv+9Yq1MGJQq5ONNDAe4Q3efaZZpkqRsgAAAAASUVORK5CYII="
                  />
                </defs>
              </svg>
            </div>
            <div className="space-y-4">
              <h6 className="font-montreal">Feedback score dashboard</h6>
              <p className="">
                Comprehensive feedback on your speaking style and engagement
              </p>
            </div>
          </div>
        </div>

        <Link to="/auth/login">
          <button className="flex gap-2 mx-auto lg:mx-0 w-full lg:w-max py-4 px-6 items-center justify-center rounded-lg relative lg:top-7">
            <p>Start practicing today</p>
            <svg
              width="15"
              height="18"
              className="h-6 w-7"
              viewBox="0 0 15 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0243 6.32818C11.1897 6.32894 11.3481 6.39499 11.4651 6.51196C11.5821 6.62893 11.6481 6.78737 11.6489 6.95279L11.6489 12.8453C11.6518 12.9292 11.6379 13.0128 11.6078 13.0912C11.5778 13.1696 11.5322 13.2411 11.4739 13.3015C11.4156 13.3619 11.3458 13.4099 11.2685 13.4427C11.1913 13.4755 11.1082 13.4924 11.0243 13.4924C10.9403 13.4924 10.8573 13.4755 10.78 13.4427C10.7027 13.4099 10.6329 13.3619 10.5746 13.3015C10.5163 13.2411 10.4708 13.1696 10.4407 13.0912C10.4107 13.0128 10.3967 12.9292 10.3996 12.8453L10.3996 8.46128L4.39513 14.4658C4.27792 14.583 4.11895 14.6489 3.95319 14.6489C3.78743 14.6489 3.62846 14.583 3.51125 14.4658C3.39404 14.3486 3.32819 14.1896 3.32819 14.0239C3.32819 13.8581 3.39404 13.6991 3.51125 13.5819L9.51576 7.5774L5.1317 7.5774C4.96986 7.57169 4.81655 7.50338 4.70408 7.38687C4.59161 7.27035 4.52875 7.11473 4.52875 6.95279C4.52875 6.79085 4.59161 6.63523 4.70408 6.51871C4.81655 6.4022 4.96986 6.33389 5.1317 6.32818L11.0243 6.32818Z"
                fill="white"
              />
            </svg>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default Intro;
