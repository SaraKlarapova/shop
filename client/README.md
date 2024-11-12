# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


import React, { useState } from 'react'
import styles from './index.module.scss'
import { H1Bold, H2Medium } from 'admin/components/typography'
import { InputInvisible } from 'ui/inputs/input'
import { TextAreaInvisible } from 'ui/textarea'
import { TextRTF } from 'admin/components/text-rtf'
import { BtnPurpleColor, ButtonIndigo } from 'ui/buttons'
import { useMutation, useQuery } from 'react-query'
import { getPage, updateContentPage, updateHeadlinePage } from 'api'
import { PageTypes } from 'interfaces'
import { AuditLog } from 'admin/components/audit-log'
import { Editor } from 'admin/components/editor'
import EditorJS from '@editorjs/editorjs'

interface Props {
    pageHeadline: string
    page: PageTypes
}

export const Content = ({ pageHeadline, page }: Props) => {
    const [headline, setHeadline] = useState("");
    const [visible, setVisible] = useState(false);
    const refContent = React.useRef<EditorJS>()

    const { refetch, data, isLoading, isFetched } = useQuery({
        queryKey: ['page', page],
        queryFn: () => getPage(page),
        onSuccess: (data) => {
            setHeadline(data.headline)
        }
    })

    const updateHeadline = useMutation({
        mutationFn: updateHeadlinePage,
        onSuccess: (data) => {
            showUpdatedText()
        },
        onError: (error: any) => {

        }
    })

    const updateContent = useMutation({
        mutationFn: updateContentPage,
        onSuccess: (data) => {
            showUpdatedText()
        },
        onError: (error: any) => {

        }
    })

    const handleSaveContent = async () => {

        const content = await refContent.current?.save();

        updateContent.mutate({
            content: content,
            page
        })
    }

    const handleBlurHeadline = (e: React.FocusEvent<HTMLInputElement, Element>) => {
        const value = e.target.value

        updateHeadline.mutate({
            headline: value,
            page
        })
    }

    const handleOnChangeHeadline = (e: any) => {
        const value = e.target.value

        setHeadline(value)
    }

    const showUpdatedText = () => {
        setVisible(true);

        setTimeout(() => setVisible(false), 2000)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.flex}>
                <div className={styles.block}>
                    <div className={styles.header}>
                        <H1Bold>{pageHeadline}</H1Bold>
                        <div className={`${styles.saved} ${visible && styles.visible}`}>Изменения сохранены</div>
                    </div>
                    <InputInvisible type='text' value={headline} onChange={handleOnChangeHeadline} className={styles.headline} onBlur={handleBlurHeadline} />
                    {/* <TextRTF value={content} onBlur={handleBlurContent} /> */}
                    <BtnPurpleColor isLoading={updateContent.isLoading} onClick={handleSaveContent} >Сохранить</BtnPurpleColor>
                    {isFetched && <div className={styles.content}>
                        <Editor id={page} previousData={data?.content} ref={refContent} />
                    </div>}
                </div>
            </div>
        </div>
    )
}



SERVER

 @Roles(Role.SUPERADMIN)
    @UseGuards(Jwt2faAuthGuard, RolesGuard)
    @Post('update-content')
    async updateContentAgreement(@Req() req, @Body() body: UpdateContentDTO) {
        const userId = req.user.id
        const oldContent = await this.prisma.content.findUnique({
            where: {
                page: body.page
            }
        })

        const updatedAgreement = await this.prisma.content.upsert({
            where: { page: body.page },
            update: { content: body.content },
            create: { content: body.content, headline: ' ', page: body.page }
        });
        // await this.auditLogService.logChange('UPDATE', userId, updatedAgreement.id, 'Content', oldContent.content, updatedAgreement.content, 'content')

        return updatedAgreement;
    }

    import { PageTypes } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateHeadlineDTO {
    @IsNotEmpty()
    headline: string;

    @IsNotEmpty()
    page: PageTypes;
}

export class UpdateContentDTO {
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    page: PageTypes;
}