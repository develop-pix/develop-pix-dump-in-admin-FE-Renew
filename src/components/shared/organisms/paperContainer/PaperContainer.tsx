/* eslint-disable react/jsx-props-no-spreading */
import { Box, BoxProps, styled } from '@mui/material';
import { ReactNode } from 'react';
import { customColors } from '../../../../styles';

interface IProps extends BoxProps {
  topContent: ReactNode;
  bottomContent: ReactNode;
  title: string;
}

const PaperContainerBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  margin: '40px 0px 40px 0px',
  minWidth: '90vw',
});

const ContentWrapper = styled(Box)({
  width: '95%',
});

const TopContentWrapper = styled(Box)({
  display: 'flex',
  width: '100%',
});

const TitleWrapper = styled(Box)({
  fontWeight: '600',
  borderColor: customColors?.color_border_gray,
  borderBottom: 'none',
  padding: '13px 10px 5px 10px',
  borderRadius: '10px 10px 0 0',
  backgroundColor: customColors?.sub_pink,
  fontSize: '18px',
});

export default function PaperContainer({
  topContent,
  bottomContent,
  title,
  ...boxProps
}: IProps) {
  return (
    <PaperContainerBox {...boxProps}>
      <ContentWrapper>
        <TopContentWrapper>
          <TitleWrapper>{title}</TitleWrapper>
          {topContent}
        </TopContentWrapper>

        {bottomContent}
      </ContentWrapper>
    </PaperContainerBox>
  );
}
