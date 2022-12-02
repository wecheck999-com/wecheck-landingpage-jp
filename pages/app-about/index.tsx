import { AboutSectionComponent, AppFeaturesSectionComponent,CheckOurSectionComponent, GuildLineSectionComponent } from "components/AppAbout";

import { HeroSectionComopnent } from "components/Home";
import { MainLayout } from "components/Layouts/MainLayout";
import { PageWrapper } from "components/StyledComponents/CommonStyled";
import { NextPageWithLayout } from "models/common";
import Head from "next/head";

const AppAbout: NextPageWithLayout = () => {

    return (
        <PageWrapper>
            <Head>
                <title>電話番号、電話番号、詐欺に関する情報、ブローカー、気晴らしの検索</title>
                <meta name="keywords" content="wecheck999, 電話番号、電話番号、詐欺に関する情報、ブローカー、気晴らしの検索" />
                <meta name="description" content="wecheck999.com, sdt 情報、電話番号、詐欺情報、ブローカー情報、迷惑メールの検索" />
                <meta property="og:title" content="SDT の検索、電話番号の検索、詐欺情報、ブローカー、詐欺" />
                <meta property="og:description" content="wecheck999.com, 電話番号、電話番号、詐欺情報、ブローカー、面倒を調べる" />
                <meta property="og:image" content="https://wecheck999.s3.ap-southeast-1.amazonaws.com/WeCheck+(1).png" />
                <meta name="RATING" content="GENERAL" />
                <link rel="icon" href="/favicon.ico" />
                <meta property="og:url" itemProp="url" content="https:jp.wecheck999.com" />
                <link rel="canonical" href="https://www.jp.wecheck999.com" />
            </Head>
            <HeroSectionComopnent />
            <AboutSectionComponent />
            <AppFeaturesSectionComponent />
            <CheckOurSectionComponent />
            <GuildLineSectionComponent />
        </PageWrapper>
    )
}

AppAbout.Layout = MainLayout;

export default AppAbout;