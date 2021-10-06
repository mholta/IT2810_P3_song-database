import { styled } from '@mui/system';
import React from 'react';

// Component taken from PU. Written by team member

/**
 * Component for easy styling of a image. Contains functionality for
 * working with loading types, aspect ratio and border radius.
 *
 *
 * @param src - Path to image
 * @param alt - Alt text (optional)
 * @param loading - Loading type (`lazy` by default)
 * @param aspectRatio - Aspect ratio (original if nothing is provided)
 * @param borderRadius - Number setting border radius (`0` by default)
 * @param borderRadiusUnit - Border radius unit (`%` by default)
 *
 * @returns Image element
 *
 * @author Magnus Holta
 */
const Image = ({
  src,
  alt = '',
  loading = 'lazy',
  aspectratio: aspectRatio,
  borderradius: borderRadius = 0,
  borderradiusunit: borderRadiusUnit = '%',
  style,
}: ImageProps) => {
  return (
    <ImageWrapper
      aspectratio={aspectRatio}
      borderradius={borderRadius}
      borderradiusunit={borderRadiusUnit}
      style={style}
    >
      <img src={src} alt={alt} loading={loading} />
    </ImageWrapper>
  );
};

const ImageWrapper = styled('div')<ImageWrapperProps>`
  overflow: hidden;
  align-self: center;
  max-height: fit-content;
  ${({
    aspectratio: aspectRatio,
    borderradius: borderRadius,
    borderradiusunit: borderRadiusUnit,
  }) => {
    let paddingBottom: number | undefined;
    /* Calculate padding-bottom in percentage based if aspect rato is given as prop */
    if (aspectRatio) {
      const l = aspectRatio.split(':');
      const aspectRatioW: number = Number(l[0]);
      const aspectRatioH: number = Number(l[1]);
      paddingBottom =
        (Math.round((aspectRatioH / aspectRatioW) * 10) / 10) * 100;
    }
    return `
    ${aspectRatio ? 'position: relative;' : ''};
    ${aspectRatio ? 'padding-bottom: ' + paddingBottom + '%;' : ''}
    border-radius: ${borderRadius + borderRadiusUnit};
    `;
  }}
  & > img {
    ${({ aspectratio: aspectRatio }) => {
      if (aspectRatio)
        return `
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          `;
    }}
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    object-fit: cover;
  }
`;

type ImageLoadingTypes = 'lazy' | 'eager';
type ImageBorderRadiusUnits = '%' | 'rem' | 'px';
type ImageAspectRadioTypes = '1:1' | '2:1' | '1:2' | '4:3' | '16:9';

export interface ImageWrapperProps {
  aspectratio?: ImageAspectRadioTypes;
  borderradius: number;
  borderradiusunit: ImageBorderRadiusUnits;
  style?: React.CSSProperties;
}

export interface ImageProps extends Partial<ImageWrapperProps> {
  src: string;
  alt?: string;
  loading?: ImageLoadingTypes;
}

export default Image;
