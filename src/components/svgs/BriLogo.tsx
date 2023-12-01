import * as React from "react";

function BriLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={85}
      height={32}
      fill="none"
      {...props}
    >
      <g fill="#0052A1" clipPath="url(#a)">
        <path d="M6.732.01C5.556.028 5.206.045 4.981.088c-1.576.31-2.898 1.192-3.668 2.451-.33.539-.68 1.428-.829 2.115-.07.32-.073.43-.1 3.634-.016 1.817-.026 6.82-.019 11.118.013 8.617-.003 7.94.218 8.624.142.43.486 1.11.754 1.483.859 1.193 2.22 2.105 3.575 2.39.314.065.466.065 11.535.082L27.663 32l.281-.072c1.05-.271 1.705-.651 2.531-1.47.625-.619.985-1.114 1.299-1.768.178-.367.313-.755.4-1.154.059-.27.065-.63.102-6.99.02-3.691.03-8.783.02-11.317-.02-5.062-.007-4.712-.225-5.366-.297-.885-.942-1.824-1.685-2.448a6.74 6.74 0 0 0-2.115-1.19c-.499-.165-.75-.178-3.582-.198C20.768.001 8.338-.009 6.732.011Zm2.809 3.153c.915.168 1.652.548 2.3 1.193.383.376.548.61.776 1.087.2.408.322.849.363 1.301.123 1.305-.24 2.366-1.245 3.625-.569.71-1.22 1.368-2.905 2.924-1.708 1.583-2.425 2.306-2.57 2.6l-.066.139.086.132c.224.34.802.965 2.778 3.01 1.682 1.738 1.947 2.015 2.31 2.425.905 1.021 1.232 1.722 1.312 2.825.033.48 0 1.074-.083 1.391-.139.542-.545 1.216-1.05 1.738-.526.549-1.088.938-1.633 1.137l-.287.102-2.049-.013c-2.306-.01-2.17.003-2.696-.274-.443-.232-1.117-.959-1.22-1.319-.022-.072-.052-.505-.072-.958-.046-1.232-.053-20.819-.007-21.106.14-.843.992-1.632 2.056-1.91.35-.092.997-.122 2.398-.112.962.003 1.25.016 1.504.063Zm9.222-.004c.512.116 1.14.387 1.596.684.29.192.908.774 1.13 1.068.165.218.31.512.43.859.151.436.168 1.5.029 2.038-.188.754-.862 1.61-2.759 3.506a62.586 62.586 0 0 1-1.9 1.814c-1.341 1.206-2.462 2.352-2.64 2.702l-.056.11.122.138c.674.757 5.673 5.901 9.15 9.407 1.939 1.956 2.739 2.785 2.98 3.092l.109.136-.225.02c-.327.033-11.075.072-11.075.043 0-.014.148-.255.33-.532.568-.88.813-1.411.961-2.099.07-.31.076-.439.076-1.206 0-.809-.006-.882-.089-1.285a5.658 5.658 0 0 0-1.12-2.349c-.142-.178-2.395-2.61-3.968-4.275l-.978-1.038.181-.234c.483-.621.998-1.14 2.393-2.406.773-.697 1.566-1.496 1.896-1.91.674-.845 1.22-1.919 1.388-2.742.129-.64.145-1.655.036-2.431-.125-.902-.34-1.484-.816-2.227-.337-.526-.479-.764-.502-.85-.02-.066-.01-.072.136-.085.085-.01.79-.01 1.562-.007 1.094.01 1.454.023 1.623.06Zm7.695-.01c.866.11 1.49.4 1.893.886.304.363.52.882.651 1.57.06.317.066.67.133 6.152.072 6.201.092 14.27.033 14.25-.037-.01-1.302-1.295-6.176-6.271-3.886-3.965-3.704-3.777-3.704-3.84 0-.178.836-1.04 2.396-2.471 1.75-1.609 2.488-2.389 3.043-3.205.66-.978.816-1.599.82-3.254 0-.79-.007-.929-.07-1.206-.146-.664-.364-1.087-.922-1.784-.38-.476-.608-.787-.608-.833 0-.04 2.18-.033 2.511.007ZM35.446 15.936V29.35h5.726c5.884 0 6.172-.006 7.077-.135 1.633-.235 3.09-.806 4.246-1.665a7.54 7.54 0 0 0 1.669-1.768c.24-.36.637-1.173.79-1.619.69-2.042.614-4.444-.196-6.244-.558-1.24-1.605-2.578-2.567-3.281-.106-.076-.192-.152-.192-.166 0-.013.142-.178.314-.363a6.724 6.724 0 0 0 1.5-2.495c.212-.614.248-.869.248-1.691 0-.823-.043-1.213-.215-1.917-.485-1.975-1.681-3.469-3.528-4.407-1.177-.598-2.39-.922-3.9-1.04-.29-.024-2.296-.037-5.709-.037h-5.263v13.414Zm10.679-8.769c1.209.155 1.93.549 2.468 1.345.46.68.581 1.662.33 2.7-.119.488-.525 1.245-.889 1.658l-.138.159h-7.461V7.113h2.64c2.227 0 2.706.01 3.05.053Zm1.38 10.563c1.101.218 1.792.648 2.297 1.424.222.336.385.707.483 1.097.069.261.079.363.076.905 0 .516-.014.651-.073.863-.29 1.06-1.024 1.893-2.002 2.273-.384.149-.949.28-1.415.33-.201.023-1.457.037-3.38.037h-3.056V17.65l3.396.013c3.017.01 3.424.017 3.675.066ZM57.187 15.936V29.35h5.089v-9.978h2.828l3.5 4.986 3.502 4.99h2.967c1.629.002 2.964-.008 2.964-.017 0-.01-1.613-2.317-3.585-5.125-1.973-2.808-3.592-5.118-3.595-5.138-.004-.02.162-.082.37-.145 1.49-.456 2.716-1.196 3.743-2.257a7.513 7.513 0 0 0 1.956-3.532c.225-.905.291-1.47.291-2.435-.01-2.9-1.156-5.19-3.31-6.598-1.332-.872-3.004-1.394-4.92-1.546-.288-.02-2.475-.033-6.123-.033h-5.677v13.414Zm11.426-8.789c.978.123 1.837.516 2.445 1.12.3.286.543.626.717 1.002.198.42.281.773.304 1.298.053 1.193-.334 2.243-1.087 2.977-.707.69-1.602 1.067-2.769 1.17-.215.016-1.592.033-3.162.033h-2.785V7.114h3.033c1.893 0 3.136.014 3.304.033ZM79.689 15.936V29.35h5.154V2.522h-5.154v13.414Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M.363 0h84.48v32H.363z" />
        </clipPath>
      </defs>
    </svg>
  );
}

const MemoBriLogo = React.memo(BriLogo);
export default MemoBriLogo;
