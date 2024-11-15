import { api } from 'services/api';
import { ICourse, ICreateCourse, ICreateMember, ICreateTest, IGetCourseById, IPassTest, IPassTestResult, IRegisterForm, ISignInForm, ISignRes, ITest } from 'interfaces';

export const signUp = async (data: IRegisterForm): Promise<ISignRes> => {
    let response = await api.post('auth/signup', data);
    return response.data;
}
export const signIn = async (data: ISignInForm): Promise<ISignRes> => {
    let response = await api.post('auth/login', data);
    return response.data;
}

export const createTest = async (data: ICreateTest): Promise<ISignRes> => {
    let response = await api.post('tests/create', data);
    return response.data;
}

export const getTests = async (): Promise<ITest[]> => {
    let response = await api.get('tests/get');
    return response.data;
}

export const getTest = async (id: number): Promise<ITest> => {
    let response = await api.get('users/get-by-id-test', {
        params: {
            id: id
        }
    });
    return response.data;
}

export const passTest = async (data: IPassTest): Promise<IPassTestResult> => {
    let response = await api.post('users/pass-test', data);
    return response.data;
}

export const passedCourses = async (): Promise<ICourse[]> => {
    let response = await api.get('users/get-passed-courses');
    return response.data;
}

export const downloadCertificate = async (courseId: number): Promise<void> => {
    try {
        const response = await api.get('users/create-pdf', {
            responseType: 'blob',  // Important: This tells Axios to handle the response as a binary file
            params: {
                courseId: courseId
            }
        });

        // Create a URL for the blob object
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));

        // Create a temporary anchor element to trigger download
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', 'Certificate.pdf');  // Define the filename for the download
        document.body.appendChild(fileLink);

        // Trigger the download
        fileLink.click();

        // Clean up by removing the temporary link
        document.body.removeChild(fileLink);
    } catch (error) {
        console.error('Error downloading the certificate:', error);
    }
}

export const verifyCertificate = async (data: ICreateCourse): Promise<boolean> => {
    let response = await api.post('users/upload-pdf', data);
    return response.data;
}

export const createCourse = async (data: ICreateCourse): Promise<boolean> => {
    let response = await api.post('course/create', data);
    return response.data;
}

export const createMember = async (data: ICreateMember): Promise<boolean> => {
    let response = await api.post('course/create-member', data);
    return response.data;
}

export const getCourse = async (): Promise<ICourse[]> => {
    let response = await api.get('course/get');
    return response.data;
}

export const getPreviewCourse = async (id: number): Promise<IGetCourseById> => {
    let response = await api.get(`course/get-preview-course?id=${id}`);
    return response.data;
}

export const getFullCourse = async (id: number): Promise<IGetCourseById> => {
    let response = await api.get(`course/get-full-course?id=${id}`);
    return response.data;
}

export const getCountOfMembers = async (id: number): Promise<number> => {
    let response = await api.get(`course/get-count-of-members?id=${id}`);
    return response.data;
}

export const getUsername = async (): Promise<{ name: string }> => {
    let response = await api.get(`users/get-username`);
    return response.data;
}