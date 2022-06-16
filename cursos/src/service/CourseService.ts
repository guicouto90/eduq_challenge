import { Course } from '../model/Course';
import { getUserById } from '../utils/axios';
import { errorConstructor } from '../utils/errorConstructor';

class CourseService {
  private async getUser(id: String): Promise<any> {
    const user = await getUserById(id);
    return user;
  }

  private verifyCourseName(course: String): void {
    if(course !== 'COURSE_XYZ' && course !== "COURSE_ABCD") throw errorConstructor(400, 'This course name doesnt exist')
  }

  private async verifyAccess(course: String, id: String): Promise<any> {
    this.verifyCourseName(course);
    const {products, role} = await this.getUser(id);
    if(role == 'DEFAULT_USER') throw errorConstructor(401, 'User doesnt have access');
    if(products.length == 1) {
      products.forEach(({ product }: any) => {
        if(course == 'COURSE_ABCD' && product == '123456') {
          throw errorConstructor(401, 'User doesnt have access');
        } else if(course == 'COURSE_XYZ' && product == '987654') {
          throw errorConstructor(401, 'User doesnt have access');
        }
      });
    }
  }

  public async accessCourse(course: String, id: String): Promise<Object> {
    await this.verifyAccess(course, id);
    return { message: `Welcome to course ${course}`}
  }

}

export default new CourseService();