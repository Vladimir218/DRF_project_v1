import graphene
from graphene_django import DjangoObjectType
from todo.models import Project, ToDo
from users.models import CustomUser

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'



class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(UserType)
    all_todos = graphene.List(ToDoType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    project_by_user_name = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_project_by_user_name(self, info, name=None):
        projects = Project.objects.all()
        if name:
            projects = projects.filter(users__last_name=name)
        return projects


    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None
    
    def resolve_all_projects(root, info):
        return Project.objects.all()


    def resolve_all_users(root, info):
        return CustomUser.objects.all()

    def resolve_all_todos(root, info):
        return ToDo.objects.all()



class ProjectMutation(graphene.Mutation):
     class Arguments:
         name = graphene.String()
         id = graphene.ID()

     project = graphene.Field(ProjectType)

     @classmethod
     def mutate(cls, root, info, name, id):
         project = Project.objects.get(pk=id)
         project.name = name
         project.save()
         return ProjectMutation(project=project)

class Mutation(graphene.ObjectType):
      update_project = ProjectMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)